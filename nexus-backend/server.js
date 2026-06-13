const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // This allows your frontend to talk to this server

// Connect to MongoDB (You'll need a MongoDB Atlas URL)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Nexus Bank Vault Connected"))
  .catch(err => console.log(err));

// --- ROUTES ---


app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = await User.create({ fullName, email, password: hashedPassword });
    res.status(201).json({ message: "Account Created" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, fullName: user.fullName, balance: user.balance });
  } else {
    res.status(400).json({ error: "Invalid Credentials" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
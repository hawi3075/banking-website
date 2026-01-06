// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 42850.12 },
  transactions: [
    {
      name: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      type: { type: String, enum: ['income', 'expense'] }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
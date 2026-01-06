const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('bank_token', data.token); // Save login session
    onLogin(data); 
  } else {
    alert(data.error);
  }
};
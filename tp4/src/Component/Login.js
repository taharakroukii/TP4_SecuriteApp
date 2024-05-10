import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        console.log(response.data);
        if (response.data.redirectTo) {
            window.location.href = response.data.redirectTo;
        }
    } catch (error) {
        console.error(error);
    }
};


  useEffect(() => {
    if (username !== '' && password !== '') {
      handleLogin();
    }
  }, [username, password]);

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin()}>Se connecter</button>
    </div>
  );
};

export default Login;

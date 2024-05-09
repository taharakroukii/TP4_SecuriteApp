import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password });
      console.log(response.data);
      // Rediriger l'utilisateur vers la page de la boutique après un login réussi
      window.location.href = '/boutique';
    } catch (error) {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  useEffect(() => {
    if (username !== '' && password !== '') {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

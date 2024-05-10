import React, { useState } from 'react';
import axios from 'axios';
//import {useNavigate} from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
      axios.post('http://localhost:3006/login', { username, password })
        .then((response) => {
          response.data.msg ? console.log(response.data.msg) : window.location.replace("http://localhost:3000/boutique");
        }).catch(error => console.log(error));
  };


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

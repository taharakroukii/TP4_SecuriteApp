import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleRegistration = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const noConsecutiveChars = /(.)\1{2}/;

    console.log(passwordRegex.test(password))
    console.log(noConsecutiveChars.test(password))


    if (new RegExp("\\w+\\s?").test(username) && passwordRegex.test(password) && !noConsecutiveChars.test(password)) {
      await axios.post('http://localhost:3006/enregistrer', { username, password })
        .then((response) => {
          console.log(response.data);
          console.log("Enregistrement réussi ! Redirection vers la page de connexion...");
          nav('/login');
        }).catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h2>Enregistrement</h2>
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
      <button onClick={handleRegistration}>S'inscrire</button>
    </div>
  );
};

export default Registration;

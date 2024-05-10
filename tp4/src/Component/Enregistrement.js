import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Registration = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

    // Effectuer une action après chaque changement de l'état d'enregistrement
    // Par exemple, rediriger l'utilisateur vers la page de connexion après un enregistrement réussi

  const handleRegistration = async () => {
   if(new RegExp("\\w+\\s?").test(username) && new RegExp("\\w{3,}").test(password)) {
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

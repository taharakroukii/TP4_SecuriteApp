import React, { useState, useEffect} from 'react';
import axios from 'axios';


const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Ajouter l'état registrationSuccess


  useEffect(() => {
    // Effectuer une action après chaque changement de l'état d'enregistrement
    // Par exemple, rediriger l'utilisateur vers la page de connexion après un enregistrement réussi
    if (registrationSuccess) {
      console.log("Enregistrement réussi ! Redirection vers la page de connexion...");
      window.location.href = 'http://localhost:3000/login'; // ou une autre méthode de navigation
    }
  }, [registrationSuccess]); // Déclencher l'effet lorsque registrationSuccess change

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/enregistrer', { username, password });
      console.log(response.data);
      setRegistrationSuccess(true); // Définir l'état d'enregistrement sur réussi
    } catch (error) {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
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

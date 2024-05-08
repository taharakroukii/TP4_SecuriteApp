import React, { useState } from 'react';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Enregistrer le nom d'utilisateur et le mot de passe dans la base de données
    // Utiliser BCrypt pour hacher le mot de passe
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blockedIPs, setBlockedIPs] = useState([]);

  useEffect(() => {
    // Lire le fichier ip.txt et stocker les adresses IP dans blockedIPs
    axios.get('/ip.txt')
      .then(response => {
        const ips = response.data.split('\n').map(ip => ip.trim());
        setBlockedIPs(ips);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des adresses IP bloquées :', error);
      });
  }, []);

  const handleLogin = () => {
    // Obtenir l'adresse IP du client (simulation)
    const clientIP = '127.0.0.1'; // Adresse IP du client (à remplacer par la vraie adresse IP)

    // Vérifier si l'adresse IP du client est bloquée
    if (blockedIPs.includes(clientIP)) {
      console.log('Accès refusé pour cette adresse IP.');
      return; // Arrêtez le processus de connexion si l'adresse IP est bloquée
    }

    // Effectuer la requête de connexion
    axios.post('http://localhost:3006/login', { username, password })
      .then((response) => {
        // Vérifiez la réponse et agissez en conséquence
        if (response.data.msg) {
          console.log(response.data.msg);
        } else {
          // Utilisez le routage de React Router pour naviguer vers une autre page
          props.history.push('/boutique'); // Assurez-vous que le composant est rendu dans un <Route>
        }
      })
      .catch(error => console.error('Erreur lors de la connexion :', error));
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

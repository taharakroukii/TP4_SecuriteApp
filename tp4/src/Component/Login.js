// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');



//   const handleLogin = () => {
//     axios.post('http://localhost:3006/login', { username, password })
//       .then((response) => {
//         response.data.msg ? console.log(response.data.msg) : window.location.replace("http://localhost:3000/boutique");
//       }).catch(error => console.log(error));
// };

   

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Nom d'utilisateur"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Mot de passe"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={() => handleLogin()}>Se connecter</button>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ipBlacklist, setIpBlacklist] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Charger la liste des adresses IP non fiables depuis le fichier ip.txt
    axios.get('./ip.txt') // Utilisation du chemin relatif
      .then((response) => {
        // Diviser les lignes du fichier en un tableau d'adresses IP
        const ips = response.data.split('\n').map(ip => ip.trim());
        setIpBlacklist(ips);
      }).catch(error => console.log(error));
  }, []);

  const handleLogin = () => {
    // Votre logique de connexion ici

    // Assurez-vous d'avoir obtenu l'adresse IP de l'utilisateur, soit côté client, soit côté serveur

    const userIp = '172.20.32.20'; // Remplacez ceci par la vraie adresse IP de l'utilisateur obtenue côté client ou serveur

    if (ipBlacklist.includes(userIp)) {
      // Si l'adresse IP est dans la liste noire, afficher un message d'accès refusé
      setAccessDenied(true);
      setError("Accès refusé. Votre adresse IP est bloquée.");
      return; // Ne pas effectuer la requête de connexion
    }

    // Si l'adresse IP n'est pas dans la liste noire, effectuer la requête de connexion
    axios.post('http://172.20.32.20:3006/login', { username, password })
      .then((response) => {
        response.data.msg ? console.log(response.data.msg) : window.location.replace("/boutique");
      }).catch(error => {
        setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
        console.log(error);
      });
  };

  return (
    <div>
      {accessDenied ? (
        <div>
          <h2>Accès refusé</h2>
          <p>{error}</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Login;







// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [attempts, setAttempts] = useState(0);
//   const [showCaptcha, setShowCaptcha] = useState(false);
//   const captchaRef = useRef(null);
//   const [captchaImageUrl, setCaptchaImageUrl] = useState('');
//   const [blockedIps, setBlockedIps] = useState([]);

//   useEffect(() => {
//     // Charger les adresses IP depuis le fichier ip.txt
//     fetch('ip.txt')
//       .then(response => response.text())
//       .then(data => {
//         const ips = data.trim().split('\n');
//         setBlockedIps(ips);
//       })
//       .catch(error => console.error('Erreur lors du chargement des adresses IP:', error));
//   }, []);

//   const handleLogin = () => {
//     // Vérifier si l'adresse IP du client est bloquée
//     const clientIp = props.clientIp; // Supposons que props.clientIp contient l'adresse IP du client
//     if (blockedIps.includes(clientIp)) {
//       alert('Accès refusé');
//       return;
//     }

//     axios.post('http://localhost:3006/login', { username, password })
//       .then((response) => {
//         if (response.data.success) {
//           window.location.replace("http://localhost:3000/boutique");
//         } else {
//           handleFailedAttempt();
//         }
//       })
//       .catch(error => console.log(error));
//   };

//   const handleFailedAttempt = () => {
//     setAttempts(attempts + 1);
//     if (attempts >= 3) {
//       setShowCaptcha(true);
//       fetchCaptchaImage();
//     }
//   };

//   const fetchCaptchaImage = () => {
//     // Générer une nouvelle image de CAPTCHA en utilisant l'URL directe
//     const imageUrl = 'https://captchas.net/sample/image.png';
//     setCaptchaImageUrl(imageUrl);
//   };

//   const handleCaptchaVerification = (captchaValue) => {
//     axios.post('https://captchas.net/api/check_answer', { username, password, captcha: captchaValue })
//       .then((response) => {
//         if (response.data.correct) {
//           handleLogin();
//         } else {
//           console.log('CAPTCHA incorrect');
//         }
//       })
//       .catch(error => console.log(error));
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Nom d'utilisateur"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Mot de passe"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {showCaptcha && (
//         <div>
//           {captchaImageUrl && <img src={captchaImageUrl} alt="CAPTCHA" />}
//           <input type="text" placeholder="Entrez le CAPTCHA" ref={captchaRef} />
//           <button onClick={() => handleCaptchaVerification(captchaRef.current.value)}>Valider</button>
//         </div>
//       )}
//       <button onClick={() => handleLogin()} disabled={attempts >= 3}>Se connecter</button>
//       {attempts >= 3 && !showCaptcha && <p>Trop de tentatives. Veuillez saisir le CAPTCHA.</p>}
//     </div>
//   );
// };

// export default Login;






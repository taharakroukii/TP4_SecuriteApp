import React, { useState } from 'react';
import axios from 'axios';

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

// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');


//   const handleLogin = () => {
//       axios.post('http://localhost:3006/login', { username, password })
//         .then((response) => {
//           response.data.msg ? console.log(response.data.msg) : window.location.replace("http://localhost:3000/boutique");
//         }).catch(error => console.log(error));
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
//       <button onClick={() => handleLogin()}>Se connecter</button>
//     </div>
//   );
// };

// export default Login;



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






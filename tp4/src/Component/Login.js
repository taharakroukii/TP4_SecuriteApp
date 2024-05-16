/********************************* Etape 0  ***************************************************/


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

/********************************* IP  ***************************************************/
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [ipBlacklist, setIpBlacklist] = useState([]);
//   const [accessDenied, setAccessDenied] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Charger la liste des adresses IP non fiables depuis le fichier ip.txt
//     axios.get('http://localhost:3006/ips') // Utilisation du chemin relatif
//       .then((response) => {
//         // Diviser les lignes du fichier en un tableau d'adresses IP
//         console.log(response.data)
//         const ips = response.data.split('\n').map(ip => ip.trim());
//         setIpBlacklist(ips);
//       }).catch(error => console.log(error));
//   }, []);

//   const handleLogin = () => {
//     // Votre logique de connexion ici
//     const userIp = '172.20.32.20'; 

//     if (ipBlacklist.includes(userIp)) {
//       // Si l'adresse IP est dans la liste noire, afficher un message d'accès refusé
//       setAccessDenied(true);
//       setError("Accès refusé. Votre adresse IP est bloquée.");
//       return; // Ne pas effectuer la requête de connexion
//     }

//     // Si l'adresse IP n'est pas dans la liste noire, effectuer la requête de connexion
//     axios.post('http://localhost:3006/login', { username, password })
//       .then((response) => {
//         response.data.msg ? console.log(response.data.msg) : window.location.replace("/boutique");
//       }).catch(error => {
//         setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       {accessDenied ? (
//         <div>
//           <h2>Accès refusé</h2>
//           <p>{error}</p>
//         </div>
//       ) : (
//         <div>
//           <h2>Login</h2>
//           <input
//             type="text"
//             placeholder="Nom d'utilisateur"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Mot de passe"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={() => handleLogin()}>Se connecter</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

/********************************* CAPTCHA ***************************************************/
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showCaptcha, setShowCaptcha] = useState(false);
//   const [captchaPassword, setCaptchaPassword] = useState('');

//   useEffect(() => {
//     const initializeCaptcha = async () => {
//       await loadCaptchaEnginge(6);
//       setShowCaptcha(true); // Once captcha is loaded, show it
//     };
//     initializeCaptcha();
//   }, []);

//   const handleLogin = () => {
//     axios.post('http://localhost:3006/login', { username, password })
//       .then((response) => {
//         if (response.data.msg) {
//           console.log(response.data.msg);
//         } else {
//           setShowCaptcha(true);
//         }
//       }).catch(error => console.log(error));
//   };

//   const doSubmit = () => {
//     if (validateCaptcha(captchaPassword)) {
//       alert('Captcha Matched');
//     } else {
//       alert('Captcha Does Not Match');
//     }
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
//       {showCaptcha && (
//         <div >
//           <div >
//             <LoadCanvasTemplate />
//           </div>
//           <div >
//             <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" value={captchaPassword} onChange={(e) => setCaptchaPassword(e.target.value)} type="text"></input></div>
//           </div>
//           <div >
//             <div><button className="btn btn-primary" onClick={() => doSubmit()}>Submit</button></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

/********************************* 2FA ***************************************************/
import React, { useState } from 'react';
import axios from 'axios';
import ModalDeuxFacteur from './2FA/ModalDeuxFacteur';


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTwoFactorModal,setShowTwoFactorModal] = useState(false);

  
  const handleLogin = () => {
    axios.post('http://localhost:3006/login', { username, password })
      .then((response) => {
        if(response.data.msg ){
          console.log(response.data.msg) 
        }else{
          console.log(response.data);
          setShowTwoFactorModal(true);
        }

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

      {showTwoFactorModal && <ModalDeuxFacteur/>}
    </div>
  );
};


export default Login;
import React,{useState} from 'react'
import axios from 'axios';

const ModalDeuxFacteur = () => {
    const [twoFactorPass,setTwoFactorPass] = useState('');

    const handleTwoFactorSubmit  = () => {
        // Envoyer le code à deux facteurs au serveur
        axios.post('http://localhost:3006/verify-two-factor', { twoFactorPass })
          .then((response) => {
            if (response.data.success) {
              // Rediriger l'utilisateur vers la page souhaitée
              window.location.replace("/boutique");
            } else {
              console.log(response.data.msg);
            }
          }).catch(error => console.log(error));
      };


  return (
    <div>
      <h2>Authentification à deux facteurs</h2>
      <input
        type="text"
        placeholder="Code à deux facteurs"
        value={twoFactorPass}
        onChange={(e) => setTwoFactorPass(e.target.value)}
      />
      <button onClick={handleTwoFactorSubmit}>Vérifier</button>
    </div>
  )
}

export default ModalDeuxFacteur;
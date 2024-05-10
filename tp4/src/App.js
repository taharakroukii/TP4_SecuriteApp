import {React, useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Enregistrement from './Component/Enregistrement';
import Login from './Component/Login';
import Boutique from './Component/Boutique';
import Axios from "axios";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(undefined)
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3006/login").then((response) => {
        setLoggedUser(response.data.estConnecte === true ? response.data.utilisateur : undefined);

    }).catch(error => console.log(error))
}, [loggedUser])


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Enregistrement></Enregistrement>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/boutique" element={<Boutique></Boutique>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;

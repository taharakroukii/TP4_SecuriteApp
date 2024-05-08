import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Enregistrement from './Component/Enregistrement';
import Login from './Component/Login';
import Boutique from './Component/Boutique';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Enregistrement></Enregistrement>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/boutique" element={<Boutique></Boutique>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;

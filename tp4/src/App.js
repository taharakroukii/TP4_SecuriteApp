import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Enregistrement from './fenetreLogin/Enregistrement';
import Login from './fenetreLogin/Login';
import Boutique from './fenetreLogin/Boutique';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Enregistrement" component={Enregistrement} />
        <Route path="/login" component={Login} />
        <Route path="/boutique" component={Boutique} />
      </Switch>
    </Router>
  );
};

export default App;

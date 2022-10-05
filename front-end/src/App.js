import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import Routes from './routes';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Routes />
    </Switch>
  );
}

export default App;

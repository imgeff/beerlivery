import React from 'react';
import { Switch } from 'react-router-dom';
import Routes from './routes';
import GlobalProvider from './context/Global/GlobalProvider';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Routes />
      </Switch>
    </GlobalProvider>
  );
}

export default App;

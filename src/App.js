import React from 'react';
import './App.css';
// import ProductList from './pages/ProducList';
import { Route, Switch } from 'react-router-dom';
import Routes from './pages/Routes';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;

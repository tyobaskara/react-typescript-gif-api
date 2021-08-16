import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './pages/home/home.component';
import Trendings from './pages/trendings/trendings.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/trendings' component={Trendings}/>
      </Switch>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import HomePage from '../src/Components/HomePage/HomePage'
import Login from '../src/Login/Login'
import React from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div >
{/* <HomePage></HomePage> */}

<BrowserRouter>
      <Switch>
        <Route
          exact path="/" component={Login}
        ></Route>
           <Route
          exact path="/fiber" component={HomePage}
        ></Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

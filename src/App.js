/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import React, { useState } from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

export const Context = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      <div className='App'>
        <Signup />
        <Login />
      </div>
    </Context.Provider>
  );
}

export default App;

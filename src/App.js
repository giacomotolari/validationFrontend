/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

export const Context = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navBanners = ['home', 'signup', 'login'];

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:3033/login/currentuser',
        requestOptions
      );
      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <div className='App'>
          <Navbar navBanners={navBanners} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;

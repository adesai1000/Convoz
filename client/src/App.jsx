/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Pages/Signin';
import Singup from './Pages/Signup';
import Home from './Pages/home';
import Notfound from './Pages/Notfound';
import Messenger from './Pages/Messenger';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Singup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path='/messenger' element={<Messenger />} />
        <Route path='*' element={<Notfound />} />
      </Routes >
    </BrowserRouter >
  )
}
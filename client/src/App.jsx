/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Pages/SignIn';
import Singup from './Pages/Signup';
import Home from './Pages/home';
import Notfound from './Pages/Notfound';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Signin />} />
        <Route path='*' element={<Notfound />} />
      </Routes >
    </BrowserRouter >
  )
}
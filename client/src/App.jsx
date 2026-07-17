import React from 'react';
// import img from "./assets/hero.png"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/UserLogin" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import logo from '../assets/logo.png';
import admin from '../assets/admin.png';
import register from '../assets/register.png';
import user from '../assets/user.png';
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-page-container d-flex flex-column" style={{ minHeight: '100vh' }}>
      
      {/* Main Content Area */}
      <div className="main-content" style={{ flex: 1 }}>
        {/* Header Section */}
        <header className="container text-center header-section">
          <img 
            src={logo} 
            alt="LNMU Logo" 
            className="university-logo mb-3" 
          />
          <h1 className="university-name">Lalit Narayan Mithila University Darbhanga Bihar</h1>
          <h2 className="portal-name mt-2">Grievance Redressal Portal</h2>
        </header>

        {/* Cards Section */}
        <div className="container cards-wrapper">
          <div className="row justify-content-center gx-4">
            
            {/* Admin Login Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="login-card">
                <div className="icon-container">
                  <img src={admin} alt="Admin Icon" className="card-icon" />
                </div>
                <div className="text-container">
                  <Link to="/admin" className="card-title-link">
                    Admin Login
                  </Link>
                  <span className="card-subtitle">For Admin Login</span>
                </div>
              </div>
            </div>

            {/* User Registration Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="login-card">
                <div className="icon-container">
                  <img src={register} alt="Register Icon" className="card-icon" />
                </div>
                <div className="text-container">
<Link to="/UserRegister" className="card-title-link">
  User Registration
</Link>                  <span className="card-subtitle">For User Registration</span>
                </div>
              </div>
            </div>

            {/* User Login Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="login-card">
                <div className="icon-container">
                  <img src={user} alt="User Icon" className="card-icon" />
                </div>
                <div className="text-container">
                <Link to="/UserLogin" className="card-title-link">
  User Login
</Link>
                  <span className="card-subtitle">For User Login</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="custom-footer text-center">
        <p className="mb-0">All right reserved © 2026-27 Designed and Developed by Arpit Rai</p>
      </footer>

    </div>
  );
};

export default Home;
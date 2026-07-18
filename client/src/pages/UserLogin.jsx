import React, { useState } from "react";
import "./UserLogin.css";
import logo from "../assets/logo.png"; // Ensure this path matches your folder structure

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-wrapper">
      {/* ================= LEFT SECTION ================= */}
      <div className="login-left">
        <div className="left-content">
          <div className="brand-icon">
            <i className="bi bi-bank2"></i>
          </div>
          
          <h1 className="university-title">Lalit Narayan Mithila University</h1>
          <p className="university-subtitle">
            Grievance Redressal System — Submit, track<br />
            and resolve your complaints easily.
          </p>

          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon"><i className="bi bi-file-earmark-text-fill"></i></div>
              <span>Submit complaints online instantly</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><i className="bi bi-clock-fill"></i></div>
              <span>Track status in real time</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><i className="bi bi-shield-lock-fill"></i></div>
              <span>Secure & confidential process</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><i className="bi bi-chat-dots-fill"></i></div>
              <span>Discuss issues in the forum</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="login-right">
        <div className="right-content">
          
          {/* Increased logo size */}
          <img src={logo} alt="University Logo" className="uni-logo" />

          <h2 className="welcome-text">Welcome back </h2>
          <p className="welcome-subtext">Sign in to your student account to continue.</p>

          {/* Form auto-complete disabled to prevent browser overrides */}
          <form className="login-form" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                autoComplete="off" // Prevents previous email autofill
                required 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  autoComplete="new-password" // Prevents password autofill
                  required 
                />
                <button 
                  type="button" 
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="signin-btn">
              <i className="bi bi-box-arrow-in-right"></i> Sign In
            </button>
          </form>

          <div className="signup-text">
            Don't have an account? <a href="/UserRegister">Create Account</a>
          </div>
          
          <div className="back-home">
            <span className="dot">•</span> <a href="/">← Back to Home</a>
          </div>

          <div className="footer-section">
            <hr />
            <p>© 2024 LNM University Grievance Redressal System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
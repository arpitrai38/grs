import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserRegister.css";
// Ensure the logo path is correct based on your folder structure
import logo from "../assets/logo.png"; 

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Backend API logic here
  };

  return (
    <div className="register-wrapper">
      
      {/* ================= LEFT SECTION (Green Panel) ================= */}
      <div className="register-left">
        <div className="left-content">
          
          <div className="brand-icon-green">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          
          <h1 className="portal-title">Join the University Portal</h1>
          <p className="portal-subtitle">
            Create your account to submit complaints, track<br />
            them, and engage with the community.
          </p>

          <div className="left-steps-container">
            {/* Step 1 */}
            <div className="left-step">
              <div className="step-circle-left">1</div>
              <div className="step-text-left">
                <h5>Personal Details</h5>
                <small>Name, email, password & contact</small>
              </div>
            </div>
            
            <hr className="step-divider" />

            {/* Step 2 */}
            <div className="left-step">
              <div className="step-circle-left opacity-circle">2</div>
              <div className="step-text-left opacity-text">
                <h5>Academic Details</h5>
                <small>College, session, course & address</small>
              </div>
            </div>
            
            <hr className="step-divider" />

            {/* Step 3 */}
            <div className="left-step">
              <div className="step-circle-left opacity-circle">3</div>
              <div className="step-text-left opacity-text">
                <h5>Start Using GRS</h5>
                <small>Submit & track your complaints</small>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ================= RIGHT SECTION (Form Panel) ================= */}
      <div className="register-right">
        <div className="right-content">
          
          <img src={logo} alt="University Logo" className="uni-logo-reg" />

          <h2 className="form-title">Create Account</h2>
          <p className="form-subtitle">Fill in your personal information to get started.</p>

          {/* Progress Bar indicator */}
          <div className="progress-indicator">
            <div className="prog-circle active">1</div>
            <div className="prog-line"></div>
            <div className="prog-circle inactive">2</div>
          </div>

          <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
            
            <div className="form-grid">
              {/* Full Name */}
              <div className="input-group">
                <label>Full Name <span>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Father's Name */}
              <div className="input-group">
                <label>Father's Name <span>*</span></label>
                <input
                  type="text"
                  name="fathersName"
                  placeholder="Father's name"
                  value={formData.fathersName}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="input-group">
                <label>Email Address <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="new-email"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="input-group">
                <label>Mobile Number <span>*</span></label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="10-digit mobile"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Gender */}
              <div className="input-group">
                <label>Gender <span>*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="input-group">
                <label>Date of Birth <span>*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password (Full Width) */}
            <div className="input-group full-width mt-3">
              <label>Password <span>*</span></label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            <button type="submit" className="submit-btn mt-4">
              Next Step <i className="bi bi-arrow-right"></i>
            </button>

            <div className="auth-switch-text mt-4">
              Already have an account? <Link to="/UserLogin" className="sign-in-link">Sign In</Link>
            </div>

          </form>
        </div>
      </div>
      
    </div>
  );
};

export default UserRegister;
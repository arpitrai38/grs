import React, { useState } from "react";
import "./AdminLogin.css";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="admin-page">

      <div className="card admin-card border-0">

        {/* Header */}

        <div className="admin-header text-center">

          <div className="shield-box">
            <i className="bi bi-shield-lock-fill"></i>
          </div>

          <h2>Admin Portal</h2>

          <p>
            LNM University Grievance Redressal System
          </p>

        </div>

        {/* Body */}

        <div className="admin-body">

          <div className="text-center mb-4">

            <span className="access-badge">
              <i className="bi bi-lock-fill me-2"></i>
              RESTRICTED ACCESS
            </span>

          </div>

          {/* Email */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Admin Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="admin@university.edu"
            />

          </div>

          {/* Password */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="position-relative">

              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Enter admin password"
              />

              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  }`}
                ></i>
              </button>

            </div>

          </div>

          {/* Login */}

          <button className="btn login-btn">

            <i className="bi bi-box-arrow-in-right me-2"></i>

            Sign In as Admin

          </button>

          {/* Links */}

          <div className="bottom-links">

            <a href="#">Forgot password?</a>

            <Link to="/">← Back to Home</Link>

          </div>

          <hr />

          <p className="footer-text">

            © 2024 LNM University • Admin access is logged and monitored

          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
import React, { useState } from "react";
import "./UserLogin.css";
import logo from "../assets/logo.png";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 vh-100">

        {/* Left Side */}
        <div className="col-lg-7 left-login d-flex justify-content-center align-items-center">

          <div className="left-content text-center">

            <div className="university-icon">
              <i className="bi bi-bank"></i>
            </div>

            <h1 className="fw-bold mt-4">
              Lalit Narayan Mithila University
            </h1>

            <p className="mt-3">
              Grievance Redressal System — Submit, track
              <br />
              and resolve your complaints easily.
            </p>

            <div className="feature-list mt-5">

              <div className="feature-item">
                <i className="bi bi-file-earmark-text-fill"></i>
                <span>Submit complaints online instantly</span>
              </div>

              <div className="feature-item">
                <i className="bi bi-clock-fill"></i>
                <span>Track status in real time</span>
              </div>

              <div className="feature-item">
                <i className="bi bi-shield-lock-fill"></i>
                <span>Secure & confidential process</span>
              </div>

              <div className="feature-item">
                <i className="bi bi-chat-dots-fill"></i>
                <span>Discuss issues in the forum</span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="col-lg-5 d-flex justify-content-center align-items-center">

          <div className="login-card">

            <img src={logo} alt="logo" className="logo" />

            <h1 className="fw-bold mt-4">
              Welcome back 👋
            </h1>

            <p className="text-muted">
              Sign in to your student account to continue.
            </p>

            <div className="mt-4">

              <label className="form-label">
                Email Address
              </label>

              <input
  type="email"
  className="form-control mb-4"
  placeholder="you@example.com"
  autoComplete="new-email"
  name="email"
/>

              <label className="form-label">
                Password
              </label>

              <div className="position-relative">
 <input
  type={showPassword ? "text" : "password"}
  className="form-control pe-5"
  placeholder="Enter your password"
  autoComplete="new-password"
  name="password"
/>

  <button
    type="button"
    className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="#6c757d"
        aria-hidden="true"
      >
        <path d="M13.359 11.238l1.387 1.387a.5.5 0 0 0 .708-.708l-1.387-1.387A8.06 8.06 0 0 0 15.643 8a8.06 8.06 0 0 0-1.576-2.53 1 1 0 0 0-1.486 1.344A6.062 6.062 0 0 1 14.643 8c-.058.1-.126.2-.194.298l-.09.11z"/>
        <path d="M3.173 2.147a.5.5 0 0 0-.707.707l1.387 1.387A8.06 8.06 0 0 0 .357 8a8.06 8.06 0 0 0 1.576 2.53 1 1 0 0 0 1.486-1.344A6.062 6.062 0 0 1 1.357 8c.058-.1.126-.2.194-.298l1.622-1.622L3.173 2.147z"/>
        <path d="M6.646 6.646a2 2 0 0 0 2.708 2.708l-2.708-2.708z"/>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="#6c757d"
        aria-hidden="true"
      >
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12.5A4.5 4.5 0 1 1 8 3.5a4.5 4.5 0 0 1 0 9z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
      </svg>
    )}
  </button>
</div>
              <div className="text-end mt-2">

                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>

              </div>

              <button className="btn btn-primary login-btn mt-4">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </button>

              <p className="text-center mt-4">

                Don't have an account?

                <a href="#" className="text-decoration-none ms-2">
                  Create Account
                </a>

              </p>

              <p className="text-center">

                •
                <a href="#" className="ms-2">
                  ← Back to Home
                </a>

              </p>

              <hr />

              <p className="text-center text-muted small">
                © 2024 LNM University Grievance Redressal System
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserLogin;
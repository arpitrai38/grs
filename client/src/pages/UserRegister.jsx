import React, { useState } from "react";
import "./UserRegister.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        {/* Left Side */}
        <div className="col-lg-6 left-panel d-flex justify-content-center align-items-center">

          <div className="left-content text-center">

            <div className="icon-box">
              <i className="bi bi-mortarboard-fill"></i>
            </div>

            <h1 className="mt-4 fw-bold">
              Join the University Portal
            </h1>

            <p className="mt-3">
              Create your account to submit complaints,
              track them, and engage with the community.
            </p>

            <div className="steps mt-5">

              <div className="step d-flex align-items-center">

                <div className="step-number">
                  1
                </div>

                <div className="ms-4 text-start">

                  <h5>Personal Details</h5>

                  <small>Name, Email, Password & Contact</small>

                </div>

              </div>

              <div className="step d-flex align-items-center">

                <div className="step-number">
                  2
                </div>

                <div className="ms-4 text-start">

                  <h5>Academic Details</h5>

                  <small>College, Session, Course & Address</small>

                </div>

              </div>

              <div className="step d-flex align-items-center">

                <div className="step-number">
                  3
                </div>

                <div className="ms-4 text-start">

                  <h5>Start Using GRS</h5>

                  <small>Submit & Track Complaints</small>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="col-lg-6 right-panel d-flex justify-content-center align-items-center">

          <div className="register-card">

            <img src={logo} alt="Logo" className="logo" />

            <h2 className="fw-bold mt-3">
              Create Account
            </h2>

            <p className="text-muted">
              Fill in your personal information to get started.
            </p>

            {/* Progress */}

            <div className="step-progress">

              <div className="circle active">
                1
              </div>

              <div className="line"></div>

              <div className="circle">
                2
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Full Name *
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Your full name"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Father's Name *
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Father's name"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Email Address *
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="you@email.com"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Mobile Number *
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="10-digit mobile"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Gender *
                </label>

                <select className="form-select">

                  <option>-- Select --</option>

                  <option>Male</option>

                  <option>Female</option>

                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Date Of Birth *
                </label>

                <input
                  type="date"
                  className="form-control"
                />

              </div>

              <div className="col-12 mb-4">

                <label className="form-label">
                  Password *
                </label>

                <div className="position-relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    placeholder="Create a strong password"
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >

                    <i
                      className={`bi ${
                        showPassword
                          ? "bi-eye-slash-fill"
                          : "bi-eye-fill"
                      }`}
                    ></i>

                  </button>

                </div>

              </div>

            </div>

            <button className="btn next-btn w-100">

              Next Step

              <i className="bi bi-arrow-right ms-2"></i>

            </button>

            <p className="text-center mt-4">

              Already have an account?

              <Link
                to="/userlogin"
                className="text-success fw-semibold text-decoration-none ms-2"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserRegister;
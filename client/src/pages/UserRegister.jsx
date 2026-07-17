import React, { useState } from "react";
import "./UserRegister.css";
import { Link } from "react-router-dom";
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

    // Backend API yaha call hogi
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        {/* Left Section */}
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

                <div className="step-number">1</div>

                <div className="ms-4 text-start">
                  <h5>Personal Details</h5>
                  <small>Name, Email, Password & Contact</small>
                </div>

              </div>

              <div className="step d-flex align-items-center">

                <div className="step-number">2</div>

                <div className="ms-4 text-start">
                  <h5>Academic Details</h5>
                  <small>College, Session, Course & Address</small>
                </div>

              </div>

              <div className="step d-flex align-items-center">

                <div className="step-number">3</div>

                <div className="ms-4 text-start">
                  <h5>Start Using GRS</h5>
                  <small>Submit & Track Complaints</small>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="col-lg-6 right-panel d-flex justify-content-center align-items-center">

          <div className="register-card">

            <img src={logo} alt="Logo" className="logo" />

            <h2 className="fw-bold mt-3">
              Create Account
            </h2>

            <p className="text-muted">
              Fill in your personal information to get started.
            </p>

            <div className="step-progress">

              <div className="circle active">1</div>

              <div className="line"></div>

              <div className="circle">2</div>

            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="row">

                {/* Full Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Father's Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Father's Name <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Father's Name"
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="new-email"
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Mobile Number <span className="text-danger">*</span>
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="10-digit mobile "
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    maxLength={10}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* DOB */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Date of Birth <span className="text-danger">*</span>
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="col-12 mb-4">
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>

                  <div className="position-relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control pe-5"
                      placeholder="Create Strong Password"
                      name="password"
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
                          <button
              type="submit"
              className="btn btn-success w-100 next-btn"
            >
              Next Step
              <i className="bi bi-arrow-right ms-2"></i>
            </button>

            <p className="text-center mt-4 mb-0">
              Already have an account?

              <Link
                to="/userlogin"
                className="text-success fw-semibold text-decoration-none ms-2"
              >
                Sign In
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>

  </div>
);

};

export default UserRegister;
import React from "react";
import "./Home.css";
import logo from "../assets/logo.png";
import admin from "../assets/admin.png";
import register from "../assets/register.png";
import user from "../assets/user.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      {/* Logo */}
      <div className="text-center pt-3">

        <img src={logo} alt="Logo" className="main-logo" />

        <h2 className="university-name">
          Lalit Narayan Mithila University Darbhanga Bihar
        </h2>

        <h3 className="portal-name">
          Grievance Redressal Portal
        </h3>

      </div>

      {/* Cards */}

      <div className="container mt-5">

        <div className="row justify-content-center g-5">

          {/* Admin */}

          <div className="col-lg-4 col-md-6">

            <Link to="/admin" className="text-decoration-none">

              <div className="portal-card">

                <img src={admin} alt="" className="card-img" />

                <div>

                  <h4>Admin Login</h4>

                  <p>For Admin Login</p>

                </div>

              </div>

            </Link>

          </div>

          {/* Register */}

          <div className="col-lg-4 col-md-6">

            <Link to="/userregister" className="text-decoration-none">

              <div className="portal-card">

                <img src={register} alt="" className="card-img" />

                <div>

                  <h4>User Registration</h4>

                  <p>For User Registration</p>

                </div>

              </div>

            </Link>

          </div>

          {/* User Login */}

          <div className="col-lg-4 col-md-6">

            <Link to="/userlogin" className="text-decoration-none">

              <div className="portal-card">

                <img src={user} alt="" className="card-img" />

                <div>

                  <h4>User Login</h4>

                  <p>For User Login</p>

                </div>

              </div>

            </Link>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="footer">

        All Right Reserved © 2023-24 Designed and Developed by Arpit Rai.

      </footer>

    </div>
  );
};

export default Home;
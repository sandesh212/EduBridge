import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import elogo from "../images/elogo.png";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  return (
    <>
         <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isLoggedIn ? 'logged-in-navbar' : ''}`}>
        <Link className="navbar-brand" to="/">
          <img src={elogo} alt="elogo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">

              {!localStorage.getItem('token')?<Link className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </Link> : " "}
            </li>
            <li className="nav-item">
            {!localStorage.getItem('token') ?<Link className="nav-link" to="/Signup">
                Sign up
              </Link>: " "}
            </li>
            <li className="nav-item">
            {!localStorage.getItem('token')?<Link className="nav-link" to="/Login">
                Login
              </Link>: ""}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

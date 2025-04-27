import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgSrc from "./Assets/student_1.jpg";
import { Avatar } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const Sidebar = (props) => {
  let navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("occupation");
    localStorage.removeItem("token");
    props.handleLogout();
    navigate("/");
  };

  return (
    <div
      class="col-md-2 col-lg-2 sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li class="nav-item mb-2 mt-3">
          <a class="nav-link text-secondary" href="#">
            <h5>
              {props.firstName} {props.lastName}
            </h5>
          </a>
        </li>
        <li class="nav-item mb-2 ">
          <Link class="nav-link text-secondary" to="/Dashboard">
            <i class="fas fa-home font-weight-bold"></i>
            <span className="ml-3">Home</span>
          </Link>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/EditProfile">
            <i class="fas fa-edit font-weight-bold"></i>
            <span className="ml-3">Edit Profile</span>
          </Link>
          <ul
            class="list-unstyled flex-column pl-3 collapse"
            id="submenu1"
            aria-expanded="false"
          ></ul>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/ProfileView">
            <i class="fas fa-user font-weight-bold"></i>
            <span className="ml-3">View Profile</span>
          </Link>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/UserFundingDetails">
            <i class="fa fa-twitch font font-weight-bold"></i>
            <span className="ml-3">Funding</span>
          </Link>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/Connections">
            <i class="fas fa-users font-weight-bold"></i>
            <span className="ml-3">Connections</span>
          </Link>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/ShowAppointments">
            <i class="far fa-calendar font-weight-bold"></i>
            <span className="ml-3">Appointment</span>
          </Link>
        </li>
        <li class="nav-item mb-2">
          <Link class="nav-link text-secondary" to="/chat">
            <i class="fas fa-comment-alt font-weight-bold"></i>
            <span className="ml-3">Chat</span>
          </Link>
        </li>
        <li class="nav-item mb-2 mt-5">
          <Link class="nav-link text-secondary" to="/">
            <button type="button" class="btn btn-danger" onClick={handlelogout}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

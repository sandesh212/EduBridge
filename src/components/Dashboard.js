import React, { useState, useEffect } from "react";
import profileImage from "./Assets/teacher1.jpg";
import {useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [Users, setUsers] = useState([]);

  const getAllPro = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/getAllUsers",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPro();
  }, []);
  const navigate = useNavigate();
  const navigateToProfile = (id) => {
    navigate(`/SupervisorProfileView/${id}`);
  };

  return (
    <>
      <div className="col main pt-5 mt-3">
        <p className="lead d-none d-sm-block">Supervisor Available</p>
        <div
          className="alert alert-warning fade collapse"
          role="alert"
          id="myAlert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <strong>Data and Records</strong> Learn more about employee
        </div>
        <div className="d-flex justify-content-center">
          {Users.map((user) => (
            <div className="Card-pattren" key={user._id}>
              <div className="card-image">
                <img src={`http://localhost:8080/${user.image}`} alt="profile" className="circle-img" />
              </div>
              <div className="card-content">
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p>{user.occupation}</p>
              </div>
              <div className="card-action">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigateToProfile(user._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import React from "react";

export default function Profile(props) {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="profile-details-name">
            <span className="primary-text">
              <span className="highlighted-text">
                {props.firstName} {props.lastName}
              </span>
            </span>
          </div>
          <div className="profile-details-role">
            <span>
              <span className="profile-role-tagline">{props.occupation}</span>
            </span>
          </div>
        </div>
        <div className="profile-picture">
          <img className="profile-picture-background" src={props.img} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

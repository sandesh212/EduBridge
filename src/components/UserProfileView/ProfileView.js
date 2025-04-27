import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import View from "./View";
import { Box } from "@mui/material";
import UserContext from "../context/User/UserContext";

export default function ProfileView() {
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    getUser()
    if (user && user.image) {
      setImageURL("http://localhost:8080/" + user.image);
    }
  }, [user]);

  return (
    <Box sx={{ width: "83%", pt: 0, pl: 0 }}>
      <div className="profileview-container">
        {imageURL ? (
          <Profile
            img={imageURL}
            firstName={user?.firstName}
            lastName={user?.lastName}
            occupation={user?.occupation}
          />
        ) : (
          <Profile
            firstName={user?.firstName}
            lastName={user?.lastName}
            occupation={user?.occupation}
          />
        ) }
        <View />
      </div>
    </Box>
  );
}

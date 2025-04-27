import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import View from "./View";
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';

export default function StudentProfileView() {
  const [userData, setuserData] = useState([]);
  const fetchStudent = async(userId)=>{
    const response = await fetch(`http://localhost:8080/api/auth/fetchUser/${userId}`, {
      method: "GET",
    });
    const json = await response.json();
    setuserData(json);
  }
  const { id } = useParams();

  useEffect(() => {
    fetchStudent(id);
  })

  return (
    <>
    <Box sx={{ width: "83%", pt: 0, pl: 0 }}>
      <div className="profileview-container">
        <Profile  id={id} img={`http://localhost:8080/${userData.image}`} firstName={userData.firstName} lastName={userData.lastName} occupation={userData.occupation} />
        <View userId={id} />
      </div>
    </Box>
    </>
  );
}

import { Avatar, Box, Grid, Typography } from "@mui/material";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ConnectionCard from "./SupConnectionCard";
import { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";

export function SupConnection() {
  const [Connections, setConnections] = useState([]);
  //Fetch Connection through API
  const fetchApprovedConnection = async()=>{
    const response = await fetch(`http://localhost:8080/api/connection/fetchConnection`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    }
  });
  const json = await response.json();
  const ApprovedConnection = json.filter(connection => connection.status === 'approved');
  setConnections(ApprovedConnection)
  }
  //Function to Delete Connection on Supervisor End:
  const handleDelete = async(connectionId)=>{
    try {
      await axios.delete(`http://localhost:8080/api/connection/deleteConnection/${connectionId}`).
      then((response)=>{
        alert(response.data.message);
      });
      fetchApprovedConnection();
    } catch (error) {
        console.error(error);
        alert("Failed to Approve connection request")
    }
  }
  useEffect(() => {
    fetchApprovedConnection();
  
  },[])

  const [Users, setUsers] = useState([]);

  const getStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/getStudent",
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
    getStudent();
  }, []);
  const navigate = useNavigate();
  const navigateToProfile = (id) => {
    navigate(`/StudentProfileView/${id}`);
  };
  
  return (
    <>
      <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
            <PeopleRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connections
          </Typography>
        </Box>
        <hr></hr>
        <Box sx={{ pt: 2, pl: 1}}>
          <Grid container spacing={2} direction="row">
            {Connections.map((connection) => (
              <Grid item key={connection._id} xs={4}>
                <ConnectionCard
                  recipientFirstName={connection.user.firstName}
                  recipientLastName={connection.user.lastName}
                  avatarSrc={connection.user.image}
                  connection={connection}
                  onNavigate={navigateToProfile}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
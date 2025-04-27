import { Avatar, Box, Grid, Typography } from "@mui/material";
import ConnectionCard from "./ConnectionCard";
import Sidebar from "./SideBar";
import img1 from "./Assets/teacher1.png";
import img2 from "./Assets/teacher2.png";
import img3 from "./Assets/teacher3.png";
import img4 from "./Assets/teacher1.jpg";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { useEffect, useState } from 'react';
import axios from "axios";

export function Connections() {
  const [Connections, setConnections] = useState([])
  const fetchConnection = async()=>{
      const response = await fetch('http://localhost:8080/api/connection/fetchApprovSupervisor',{
        method : 'GET',
        headers: {
          "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setConnections(json)
  }
  const handleDelete = async(connectionId)=>{
    try {
      await axios.delete(`http://localhost:8080/api/connection/deleteConnection/${connectionId}`).
      then((response)=>{
        alert(response.data.message);
      });
      fetchConnection();
    } catch (error) {
        console.error(error);
        alert("Failed to Approve connection request")
    }
  }
   useEffect(() => {
    fetchConnection();
   })
   
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
        <Box sx={{ pt: 2, pl: 2 }}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              {Connections.map((request, index) => (
                <Grid item key={request?._id} xs={6}>
                  <Grid item xs={12}>
                    <ConnectionCard
                      firstName={request.supervisor?.firstName}
                      lastName={request.supervisor?.lastName}
                      sentDate={request.sendDate}
                      status={request.status}
                      img={request.supervisor?.image}
                      connection={request}
                      onDelete={handleDelete}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

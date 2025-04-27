import AppointmentsRecord from "./AppointmentsRecord"
import React from "react";
import { Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const ViewAppointment = () => {
    return (
      <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
        <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
            <CalendarMonthRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginLeft: "8px", display: "inline-block", verticalAlign: "middle" }}>
            Your Appointments
          </Typography>
        </Box>
        <hr />
        <Box sx={{ pt: 2, pl: 1}}>
          <AppointmentsRecord></AppointmentsRecord>
        </Box>
      </Box>
    );
  };
  
  export default ViewAppointment;
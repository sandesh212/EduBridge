import React from "react";
import { Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Availability from "./Availability";

const ShowAvailability = () => {
  return (
    <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
          <CalendarMonthRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginLeft: "8px", display: "inline-block", verticalAlign: "middle" }}>
          Availability
        </Typography>
      </Box>
      <hr />
      <Box sx={{ pt: 2, pl: 1}}>
        <Availability />
      </Box>
    </Box>
  );
};

export default ShowAvailability;

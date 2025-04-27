import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PostFunding from "./PostFunding";
// import Funding from "./"
const ShowFunding = () => {
  return (
    <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
          <PostAddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            marginLeft: "8px",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          Post
        </Typography>
      </Box>
      <hr />
      <Box sx={{ pt: 2, pl: 1 }}>
        <PostFunding />
      </Box>
    </Box>
  );
};

export default ShowFunding;

import React,{useState,useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FundingsPosts from "./FundingsPosts"
import FundingDetailsView from "./FundingsPosts";

const App = () => {
  const [funding, setFunding] = useState([])

  const fetchFunding = async()=>{
    const response = await fetch(`http://localhost:8080/api/Funding/fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setFunding(json);
  }
  useEffect(() => {
    fetchFunding();
  })
  return (
    <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
          <DynamicFeedIcon color="inherit"/>
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginLeft: "8px", display: "inline-block", verticalAlign: "middle" }}>
          Funding Feeds
        </Typography>
      </Box>
      <hr />
      <Box sx={{ pt: 2, pl: 1}}>
        {funding.map((data)=>(
            <FundingDetailsView key={data._id}
            firstName={data.postBy.firstName}
            lastName={data.postBy.lastName}
            occupation={data.postBy.occupation}
            description={data.description}
            img={data.postBy.image}
            link={data.link}
            file={data.file}
            postDate={data.postDate}
            />
        ))}
      </Box>
    </Box>
  );
};

export default App;


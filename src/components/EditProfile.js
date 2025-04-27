import React, { useState } from "react";
import Sidebar from "./SideBar";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SkillsSection from "./EditProfileSections/SkillsSection";
import Box from "@mui/material/Box";
import PersonalDetailsSection from "./EditProfileSections/PersonalDetailsSection";
import ProjectSection from "./EditProfileSections/ProjectSection";
import EducationSection from "./EditProfileSections/EducationSection";
import WorkExperienceSection from "./EditProfileSections/WorkExperienceSection";

function EditProfile() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ width: "83%", pt: 1 }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange}   sx={{ "& .MuiTab-root": { marginRight: "16px" } }}>
            <Tab label="Personal Details" />
            <Tab label="Education" />
            <Tab label="Work Experience" />
            <Tab label="Projects" />
            <Tab label="Skills & Domain" />
          </Tabs>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            paddingBottom: "100px", // Adjust the bottom padding as needed
          }}
        >
          <TabPanel value={value} index={0}>
            <PersonalDetailsSection />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EducationSection />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WorkExperienceSection />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProjectSection />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <SkillsSection />
          </TabPanel>
        </Box>
      </Box>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default EditProfile;

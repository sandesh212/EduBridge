import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjectContext from "../context/project/ProjectContext";
import { useEffect } from "react";
export default function ProjectSection() {
  const context = useContext(ProjectContext);
  const { AddProject, Project, getProject, deleteProject, updateProject } =
    context;

  const [isEditMode, setisEditMode] = useState(false);
  const [project, setProject] = useState({
    projectTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  useEffect(() => {
    getProject();
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
    
      // Check if the start date is a valid date
      if (isNaN(startDate.getTime())) {
        alert("Invalid start date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the end date is a valid date
      if (project.endDate && isNaN(endDate.getTime())) {
        alert("Invalid end date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the start date is after the end date
      if (project.endDate && startDate > endDate) {
        alert("Start date cannot be after the end date.");
        return;
      }

      // Check if the project with the same title already exists
      if (Project.some((proj) => proj.projectTitle === project.projectTitle)) {
        alert("Project with the same title already exists.");
        return;
      }
      AddProject(
        project.projectTitle,
        project.startDate,
        project.endDate === null ? "Present" : project.endDate,
        project.description
      );
      setProject({
        projectTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      alert("Project details added successfully!");
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    deleteProject(id);
  };
  const handleUpdate = (id) => {
    const selectedProject = Project.find((item) => item._id === id);
    if (selectedProject) {
      setProject({
        id: selectedProject._id,
        projectTitle: selectedProject.projectTitle,
        startDate: selectedProject.startDate,
        endDate:
          selectedProject.endDate === null
            ? "Present"
            : selectedProject.endDate,
        description: selectedProject.description,
      });
      setisEditMode(true);
    }
  };
  const handleEditSubmit = () => {
    if (validateForm()) {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
    
      // Check if the start date is a valid date
      if (isNaN(startDate.getTime())) {
        alert("Invalid start date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the end date is a valid date
      if (project.endDate && isNaN(endDate.getTime())) {
        alert("Invalid end date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the start date is after the end date
      if (project.endDate && startDate > endDate) {
        alert("Start date cannot be after the end date.");
        return;
      }
      
      // Check if the project with the same title already exists excluding the current project being edited
      if (
        Project.some(
          (proj) =>
            proj.projectTitle === project.projectTitle &&
            proj._id !== project.id
        )
      ) {
        alert("Project with the same title already exists.");
        return;
      }
      // Call your update function here
      const endDateValue = project.endDate === "Present" ? null : project.endDate;
      updateProject(project.id, {
        projectTitle: project.projectTitle,
        startDate: project.startDate,
        endDate: endDateValue,
        description: project.description,
      });

      // Reset form and edit mode
      clearForm();
    }
  };
  const clearForm = () => {
    setProject({
      projectTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setisEditMode(false);
  };
  const [IsProjectTitleEmpty, SetIsProjectTitleEmpty] = useState(false);
  const [IsProjectStartDateEmpty, SetIsProjectStartDateEmpty] = useState(false);
  const validateForm = () => {
    let isValid = true;
    if (project.projectTitle.trim() === "") {
      SetIsProjectTitleEmpty(true);
      isValid = false;
    } else {
      SetIsProjectTitleEmpty(false);
    }
    if (project.startDate.trim() === "") {
      SetIsProjectStartDateEmpty(true);
      isValid = false;
    } else {
      SetIsProjectStartDateEmpty(false);
    }
    return isValid;
  };
  return (
    <Box
      sx={{
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" noValidate sx={{ mt: 0, width: "100%" }}>
        <Typography variant="overline" textAlign="center">
          Projects
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              id="project-title"
              name="projectTitle"
              label="Project Title"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={IsProjectTitleEmpty}
              helperText={IsProjectTitleEmpty && "Project Title is required"}
              value={project.projectTitle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="start-date"
              onChange={handleChange}
              name="startDate"
              label="Start Date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              margin="normal"
              variant="outlined"
              value={project.startDate}
              error={IsProjectStartDateEmpty}
              helperText={IsProjectStartDateEmpty && "Start date is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="endDate"
              id="endDate"
              label="End Date"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              fullWidth
              margin="normal"
              variant="outlined"
              value={project.endDate === "Present" ? "" : project.endDate}
              onChange={handleChange}
              InputProps={{
                endAdornment: !project.endDate && (
                  <InputAdornment position="end">
                    <Typography variant="caption" color="textSecondary">
                      Present
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              value={project.description}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={isEditMode ? handleEditSubmit : handleSubmit}
          className="mx-3"
        >
          {isEditMode ? "Update Project" : "Add new Project"}
        </Button>
        {isEditMode && (
          <Button
            variant="contained"
            color="primary"
            visiblity={isEditMode}
            onClick={clearForm}
            className="mx-3"
          >
            Cancel
          </Button>
        )}
      </Box>
      {Project.length > 0 && (
        <Box mt={4} sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Title</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Project.map((proj) => (
                  <TableRow key={proj.id}>
                    <TableCell>{proj.projectTitle}</TableCell>
                    <TableCell>{proj.startDate}</TableCell>
                    <TableCell>{proj.endDate === null ? "Present" : proj.endDate}</TableCell>
                    <TableCell>{proj.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdate(proj._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(proj._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

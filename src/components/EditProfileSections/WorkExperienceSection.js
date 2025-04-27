import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import WorkContext from "../context/WorkExperience/WorkContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function WorkExperienceSection() {
  const context = useContext(WorkContext);
  const { Work, AddWork, deleteWork, getWork, updateWorkExperience } = context;
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isEmployeeEmpty, setIsEmployeeEmpty] = useState(false);
  const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);

  const [work, setWork] = useState({
    id: "",
    title: "",
    employee: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    getWork();
  }, [work]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      const startDate = new Date(work.startDate);
      const endDate = new Date(work.endDate);
    
      // Check if the start date is a valid date
      if (isNaN(startDate.getTime())) {
        alert("Invalid start date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the end date is a valid date
      if (work.endDate && isNaN(endDate.getTime())) {
        alert("Invalid end date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the start date is after the end date
      if (work.endDate && startDate > endDate) {
        alert("Start date cannot be after the end date.");
        return;
      }
        AddWork(
          work.title,
          work.employee,
          work.startDate,
          work.endDate,
          work.description
        );
      clearForm();
    }
  };

  const handleChange = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdate = (id) => {
    const selectedWork = Work.find((item) => item._id === id);
    if (selectedWork) {
      setWork({
        id: selectedWork._id,
        title: selectedWork.title,
        employee: selectedWork.employee,
        startDate: selectedWork.startDate,
        endDate: selectedWork.endDate,
        description: selectedWork.description,
      });
      setIsEditMode(true);
    }
  };

  const handleDelete = (id) => {
    deleteWork(id);
  };

  const clearForm = () => {
    setWork({
      id: "",
      title: "",
      employee: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsEditMode(false);
  };

  const handleEditSubmit = () => {
    if (validateForm()) {
      const startDate = new Date(work.startDate);
      const endDate = new Date(work.endDate);
    
      // Check if the start date is a valid date
      if (isNaN(startDate.getTime())) {
        alert("Invalid start date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the end date is a valid date
      if (work.endDate && isNaN(endDate.getTime())) {
        alert("Invalid end date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the start date is after the end date
      if (work.endDate && startDate > endDate) {
        alert("Start date cannot be after the end date.");
        return;
      }
      const endDateValue = work.endDate === "Present" ? null : work.endDate;
        updateWorkExperience(work.id, {
          title: work.title,
          employee: work.employee,
          startDate: work.startDate,
          endDate: endDateValue,
          description: work.description,
        });
      clearForm();
      setIsEditMode(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (work.title.trim() === "") {
      setIsTitleEmpty(true);
      isValid = false;
    } else {
      setIsTitleEmpty(false);
    }

    if (work.employee.trim() === "") {
      setIsEmployeeEmpty(true);
      isValid = false;
    } else {
      setIsEmployeeEmpty(false);
    }

    if (work.startDate.trim() === "") {
      setIsStartDateEmpty(true);
      isValid = false;
    } else {
      setIsStartDateEmpty(false);
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
      <Box component="form" noValidate sx={{ mt: 0 }}>
        <Typography variant="overline" textAlign={"center"}>
          Work Experience
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="title"
              id="job-title"
              label="Job Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={work.title}
              onChange={handleChange}
              error={isTitleEmpty}
              helperText={isTitleEmpty && "Title is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="employee"
              id="employer"
              label="Employer"
              fullWidth
              margin="normal"
              variant="outlined"
              value={work.employee}
              onChange={handleChange}
              error={isEmployeeEmpty}
              helperText={isEmployeeEmpty && "Employer is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="date"
              name="startDate"
              id="startDate"
              label="Start Date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              value={work.startDate}
              onChange={handleChange}
              error={isStartDateEmpty}
              helperText={isStartDateEmpty && "Start-date is required"}
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
              value={work.endDate === "Present" ? "" : work.endDate}
              onChange={handleChange}
              InputProps={{
                endAdornment: !work.endDate && (
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
              name="description"
              id="description"
              label="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              value={work.description}
              onChange={handleChange}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className="mx-3"
              onClick={isEditMode ? handleEditSubmit : handleSubmit}
            >
              {isEditMode ? "Update Work Experience" : "Add Work Experience"}
            </Button>
            {isEditMode && (
              <Button
                variant="contained"
                color="primary"
                className="mx-3"
                onClick={clearForm}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      {Work.length > 0 && (
        <Box mt={4} sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Employer</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Work.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.employee}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>
                      {item.endDate === "" ? "Present" : item.endDate}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdate(item._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item._id)}>
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

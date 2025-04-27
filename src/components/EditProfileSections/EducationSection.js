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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useContext, useEffect } from "react";
import EducationContext from "../context/Education/EducationContext";

export default function EducationSection() {
  const [isInstituteNameEmpty, setIsInstituteNameEmpty] = useState(false);
  const [isDegreeEmpty, setIsDegreeEmpty] = useState(false);
  const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);

  // Calling Education Context API
  const context = useContext(EducationContext);
  const { AddEducation, Education, deleteEducation, updateEducation } = context;

  //Calling Education Context
  const educontext = useContext(EducationContext);
  const { Edu, getEducation } = educontext;

  // State for Education Data
  const [education, setEducation] = useState({
    id: "",
    InstituteName: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Retrieve education data from the server or local storage
    getEducation();
  }, [education]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Reset form and edit mode
      setEducation({
        id: "",
        InstituteName: "",
        degree: "",
        startDate: "",
        endDate: "",
      });
      setIsEditMode(false);
    } else {
      if (validateForm() === true) {

        const startDate = new Date(education.startDate);
        const endDate = new Date(education.endDate);
      
        // Check if the start date is a valid date
        if (isNaN(startDate.getTime())) {
          alert("Invalid start date format. Please use the MM/DD/YYYY format.");
          return;
        }
      
        // Check if the end date is a valid date
        if (education.endDate && isNaN(endDate.getTime())) {
          alert("Invalid end date format. Please use the MM/DD/YYYY format.");
          return;
        }
      
        // Check if the start date is after the end date
        if (education.endDate && startDate > endDate) {
          alert("Start date cannot be after the end date.");
          return;
        }
        // Add new education
        AddEducation(
          education.InstituteName,
          education.degree,
          education.startDate,
          education.endDate === null ? "Present" : education.endDate
        );
        // Reset form
        setEducation({
          id: "",
          InstituteName: "",
          degree: "",
          startDate: "",
          endDate: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdate = (id) => {
    const selectedEducation = Education.find((item) => item._id === id);
    if (selectedEducation) {
      setEducation({
        id: selectedEducation._id,
        InstituteName: selectedEducation.InstituteName,
        degree: selectedEducation.degree,
        startDate: selectedEducation.startDate,
        endDate: selectedEducation.endDate,
      });
      setIsEditMode(true);
    }
  };

  const handleDelete = (id) => {
    deleteEducation(id);
  };

  const clearForm = () => {
    setEducation({
      id: "",
      InstituteName: "",
      degree: "",
      startDate: "",
      endDate: "",
    });
    setIsEditMode(false);
  };

  // Function to handle the edit submission
  const handleEditSubmit = () => {
    if (validateForm()) {
      const startDate = new Date(education.startDate);
      const endDate = new Date(education.endDate);
    
      // Check if the start date is a valid date
      if (isNaN(startDate.getTime())) {
        alert("Invalid start date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the end date is a valid date
      if (education.endDate && isNaN(endDate.getTime())) {
        alert("Invalid end date format. Please use the MM/DD/YYYY format.");
        return;
      }
    
      // Check if the start date is after the end date
      if (education.endDate && startDate > endDate) {
        alert("Start date cannot be after the end date.");
        return;
      }

      const endDateValue = education.endDate === "Present" ? null : education.endDate;
      // Call your update function here
      updateEducation(education.id, {
        InstituteName: education.InstituteName,
        degree: education.degree,
        startDate: education.startDate,
        endDate: endDateValue
      });

      // Reset form and edit mode
      setEducation({
        id: "",
        InstituteName: "",
        degree: "",
        startDate: "",
        endDate: "",
      });
      setIsEditMode(false);
    }
  };
  const validateForm = () => {
    let isValid = true;

    if (education.InstituteName.trim() === "") {
      setIsInstituteNameEmpty(true);
      isValid = false;
    } else {
      setIsInstituteNameEmpty(false);
    }

    if (education.degree.trim() === "") {
      setIsDegreeEmpty(true);
      isValid = false;
    } else {
      setIsDegreeEmpty(false);
    }

    if (education.startDate.trim() === "") {
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
      <Box
        component="form"
        noValidate
        sx={{ mt: 0, width: "100%" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="overline" textAlign="center">
          Education
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="InstituteName"
              id="institute-name"
              label="Institute Name"
              inputProps={{ required: true }}
              fullWidth
              margin="normal"
              variant="outlined"
              value={education.InstituteName}
              onChange={handleChange}
              error={isInstituteNameEmpty}
              helperText={isInstituteNameEmpty && "Institute Name is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="degree"
              id="degree"
              label="Degree"
              fullWidth
              margin="normal"
              variant="outlined"
              value={education.degree}
              onChange={handleChange}
              error={isDegreeEmpty}
              helperText={isDegreeEmpty && "Degree is required"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="date"
              name="startDate"
              id="start-date"
              label="Start Date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              value={education.startDate}
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
              value={education.endDate === "Present" ? "" : education.endDate}
              onChange={handleChange}
              InputProps={{
                endAdornment: !education.endDate && (
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
            <Button
              variant="contained"
              color="primary"
              className="mx-3"
              onClick={isEditMode ? handleEditSubmit : handleSubmit}
            >
              {isEditMode ? "Update Education" : "Add Education"}
            </Button>
            {isEditMode && (
              <Button
                variant="contained"
                color="primary"
                className="mx-3"
                onClick={() => clearForm()}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      {Education.length > 0 && (
        <Box mt={4} sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Institute Name</TableCell>
                  <TableCell>Degree</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Education.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.InstituteName}</TableCell>
                    <TableCell>{item.degree}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.endDate === null ? "Present" : item.endDate}</TableCell>
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

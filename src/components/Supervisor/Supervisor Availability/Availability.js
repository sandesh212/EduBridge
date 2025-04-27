import React, { useState } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 1050,
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 50,
    
  },
  button: {
    margin: theme.spacing(5),
  },
}));

const ShowAvailability = () => {
  const classes = useStyles();
  const [selectedTimeslots, setSelectedTimeslots] = useState([]);
  const [day, setDay] = useState("Monday");
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const handleTimeslotClick = (time) => {
    if (!isNotAvailable) {
      const timeslot = { day, time };
      const isSelected = selectedTimeslots.some(
        (selectedTimeslot) =>
          selectedTimeslot.day === timeslot.day &&
          selectedTimeslot.time === timeslot.time
      );
  
      if (isSelected) {
        setSelectedTimeslots((prevState) =>
          prevState.filter(
            (selectedTimeslot) =>
              selectedTimeslot.day !== timeslot.day ||
              selectedTimeslot.time !== timeslot.time
          )
        );
      } else {
        setSelectedTimeslots((prevState) => {
          // Check if the timeslot already exists in the array
          const exists = prevState.some(
            (selectedTimeslot) =>
              selectedTimeslot.day === timeslot.day &&
              selectedTimeslot.time === timeslot.time
          );
  
          // Return the previous state if the timeslot already exists
          if (exists) {
            return prevState;
          }
  
          // Add the new timeslot to the array
          return [...prevState, timeslot];
        });
      }
    }
  };
  const handleNotAvailableClick = () => {
    setIsNotAvailable(true);
    setSelectedTimeslots([]);
    console.log(`Not available on ${day}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let selectedTimeslotsToSend = [];


  // Check if "Not Available" is selected and a day is chosen
  if (isNotAvailable && day !== "") {
    const notAvailableTimeslot = { day, time: "Not Available" };
    selectedTimeslotsToSend.push(notAvailableTimeslot);
  }

  //  Add the selected timeslots for other days
  selectedTimeslots.forEach((timeslot) => {
    if (timeslot.day !== day || !isNotAvailable) {
      selectedTimeslotsToSend.push(timeslot);
    }
  });

          // API Call 
          const response = await fetch(`http://localhost:8080/api/Appointment/Availability`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            //Sending Json in form of Data in Body
            body: JSON.stringify(selectedTimeslotsToSend)
          });
      
          const data = await response.json();
          alert(data.message)
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const timeslots = {
    Monday: [
      "08:30AM - 09:00AM",
      "09:00AM - 09:30AM",
      "09:30AM - 10:00AM",
      "10:00AM - 10:30AM",
      "10:30AM - 11:00AM",
      "11:00AM - 11:30AM",
      "11:30AM - 12:00PM",
      "12:00PM - 12:30PM",
      "12:30PM - 01:00PM",
      "01:00PM - 01:30PM",
      "01:30PM - 02:00PM",
      "02:00PM - 02:30PM",
      "02:30PM - 03:00PM",
      "03:00PM - 03:30PM",
      "03:30PM - 04:00PM",
      "04:00PM - 04:30PM",
    ],
    Tuesday: [
      "08:30AM - 09:00AM",
      "09:00AM - 09:30AM",
      "09:30AM - 10:00AM",
      "10:00AM - 10:30AM",
      "10:30AM - 11:00AM",
      "11:00AM - 11:30AM",
      "11:30AM - 12:00PM",
      "12:00PM - 12:30PM",
      "12:30PM - 01:00PM",
      "01:00PM - 01:30PM",
      "01:30PM - 02:00PM",
      "02:00PM - 02:30PM",
      "02:30PM - 03:00PM",
      "03:00PM - 03:30PM",
      "03:30PM - 04:00PM",
      "04:00PM - 04:30PM",
    ],
    Wednesday: [
      "08:30AM - 09:00AM",
      "09:00AM - 09:30AM",
      "09:30AM - 10:00AM",
      "10:00AM - 10:30AM",
      "10:30AM - 11:00AM",
      "11:00AM - 11:30AM",
      "11:30AM - 12:00PM",
      "12:00PM - 12:30PM",
      "12:30PM - 01:00PM",
      "01:00PM - 01:30PM",
      "01:30PM - 02:00PM",
      "02:00PM - 02:30PM",
      "02:30PM - 03:00PM",
      "03:00PM - 03:30PM",
      "03:30PM - 04:00PM",
      "04:00PM - 04:30PM",
    ],
    Thursday: [
      "08:30AM - 09:00AM",
      "09:00AM - 09:30AM",
      "09:30AM - 10:00AM",
      "10:00AM - 10:30AM",
      "10:30AM - 11:00AM",
      "11:00AM - 11:30AM",
      "11:30AM - 12:00PM",
      "12:00PM - 12:30PM",
      "12:30PM - 01:00PM",
      "01:00PM - 01:30PM",
      "01:30PM - 02:00PM",
      "02:00PM - 02:30PM",
      "02:30PM - 03:00PM",
      "03:00PM - 03:30PM",
      "03:30PM - 04:00PM",
      "04:00PM - 04:30PM",
    ],
    Friday: [
      "08:30AM - 09:00AM",
      "09:00AM - 09:30AM",
      "09:30AM - 10:00AM",
      "10:00AM - 10:30AM",
      "10:30AM - 11:00AM",
      "11:00AM - 11:30AM",
      "11:30AM - 12:00PM",
      "12:00PM - 12:30PM",
      "12:30PM - 01:00PM",
      "01:00PM - 01:30PM",
      "01:30PM - 02:00PM",
      "02:00PM - 02:30PM",
      "02:30PM - 03:00PM",
      "03:00PM - 03:30PM",
      "03:30PM - 04:00PM",
      "04:00PM - 04:30PM",
    ],
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl className={classes.formControl}>
        <InputLabel id="date-label">Day</InputLabel>
        <Select
          labelId="day-label"
          id="day-select"
          value={day}
          onChange={handleDayChange}
          onClick={() => {
            setIsNotAvailable(false);
          }}
        >
          <MenuItem value={"Monday"}>Monday</MenuItem>
          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
          <MenuItem value={"Thursday"}>Thursday</MenuItem>
          <MenuItem value={"Friday"}>Friday</MenuItem>
        </Select>
      </FormControl>
      <Grid>
        <Box mb={2}>
          {timeslots[day].map((timeslot) => (
            <Button
              key={timeslot}
              variant={
                selectedTimeslots.some(
                  (selectedTimeslot) =>
                    selectedTimeslot.day === day &&
                    selectedTimeslot.time === timeslot
                )
                  ? "contained"
                  : "outlined"
              }
              color={
                selectedTimeslots.some(
                  (selectedTimeslot) =>
                    selectedTimeslot.day === day &&
                    selectedTimeslot.time === timeslot
                )
                  ? "primary"
                  : "default"
              }
              onClick={() => handleTimeslotClick(timeslot)}
              disabled={isNotAvailable}
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                marginRight: "10px",
                marginLeft: "85px",
              }}
            >
              {timeslot}
            </Button>
          ))}
        </Box>
      </Grid>
      <div style={{ margin: "50px 50px 50px 50px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={isNotAvailable}
                onClick={handleNotAvailableClick}
                onChange={(e) => setIsNotAvailable(e.target.checked)}
                color="primary"
              />
            }
            label="Not Available"
          />
        </div>
        <div >
          <Button
            style={{
              maxWidth: "500px",
              maxHeight: "50px",
              minWidth: "200px",
              minHeight: "30px",
            }}
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Confirm Availability
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ShowAvailability;

import React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { format } from "date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const Profile = (props) => {
  // for Send Connection Request usestates
  const [connectOpen, setConnectOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Error, setError] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [existing, setexisting] = useState("");

  const [Connection, setConnection] = useState({
    supervisor: "",
    interest: "",
    comment: "",
  });

  // for Book an appointment usestates
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isTeacherAvailable, setIsTeacherAvailable] = useState(true);
  const [Availability, setAvailability] = useState([]);
  const [Day, setDay] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [existingRequest, setexistingAppointment] = useState("");

  const onchangehandle = (e) => {
    setConnection({ ...Connection, [e.target.name]: e.target.value });
  };

  const handleConnectOpen = () => {
    setConnectOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDate("");
    setSelectedDay("");
    setSelectedTimeSlot("");
    setPurpose("");
    setOpen(false);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  // Handle the cancel action here
  const handleCancel = () => {
    console.log("Cancel");
    setIsOpen(false);
  };
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };
  const [selected_Date, setselected_Date] = useState("");

  const existingAppointment = async () => {
    const response = await fetch(
      `http://localhost:8080/api/appointment/existingRequest/${props.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
    const data = await response.json();
    const saveData = data.status;
    setexistingAppointment(saveData);
  };
  //Function to Fetch Existing Request:
  const existingConnection = async () => {
    const response = await fetch(
      `http://localhost:8080/api/connection/existingRequest/${props.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
    const data = await response.json();
    const saveData = data.status;
    setexisting(saveData);
  };
  //Function to Connect with other User through API
  const handleConnect = async () => {
    try {
      Connection.supervisor = props.id;
      if (Connection.interest === "" || Connection.comment === "") {
        setError("Please fill in all the required fields");
        return;
      }
      // API Call
      const response = await fetch(
        `http://localhost:8080/api/connection/AddConnection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          //Sending Json in form of Data in Body
          body: JSON.stringify(Connection),
        }
      );

      const data = await response.json();
      setRequestSent(true);
    } catch (error) {
      setError(error.message);
    }
    setIsOpen(false);
  };

  //Handle to fetch Date from text Field
  const handleDateChange = async (event) => {
    const selected_DateValue = event.target.value;
    setselected_Date(selected_DateValue);
    const formattedDate = formatDate(new Date(selected_Date));
  };

  //Function to Fetch the Availability through Date:
  const availability = async () => {
    const userId = props.id;
    try {
      //API Call
      const response = await axios.post(
        "http://localhost:8080/api/Appointment/Availability/fetch",
        {
          date: selected_Date,
          userId: userId,
        }
      );
      setAvailability(response.data);

      const day = response.data[0]?.day; // the response of the day selected as a Day
      setDay(day);

      const times = response.data.map((item) => item.time);
      setTimeSlots(times);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    availability();
  }, [selected_Date]); // Add selected_Date as a dependency
  
  useEffect(() => {
    existingAppointment();
  }, [existingRequest]); // Add props.id as a dependency
  
  useEffect(() => {
    existingConnection();
  }, [existing]); 

  const handleSubmit = async () => {
    const supervisor = props.id;
    const response = await fetch(
      "http://localhost:8080/api/Appointment/Request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        //Sending Json in form of Data in Body
        body: JSON.stringify({
          supervisor,
          day: Day,
          date: selected_Date,
          timeSlot: selectedTimeSlot,
          purpose,
        }),
      }
    );
    const json = await response.json();
    alert(json.message,Day);
    handleClose();
  };

  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="profile-details-name">
            <span className="primary-text">
              <span className="highlighted-text">
                {props.firstName} {""} {props.lastName}
              </span>
            </span>
          </div>
          <div className="profile-details-role">
            <span>
              <span className="profile-role-tagline">{props.occupation}</span>
            </span>
          </div>
          <div className="profile-options">
            <button
              className="primary-btn"
              onClick={handleOpen}
              disabled={
                existingRequest === "Accepted" || existingRequest === "pending"
              }
            >
              {existingRequest === "Accpeted" || existingRequest === "pending"
                ? "Already Booked" : "Book Appointment"}
            </button>
            <button
              className="highlighted-btn"
              onClick={() => setIsOpen(true)}
              disabled={existing === "approved" || existing === "pending"}
            >
              {existing === "approved" || existing === "pending"
                ? existing
                : "Connect"}
            </button>
          </div>
        </div>
        <div className="profile-picture">
          <img
            className="profile-picture-background"
            src={props.img}
            alt="Profile"
          />
        </div>
      </div>

      {/* Book an appointment popup dialog box */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            type="Date"
            onChange={handleDateChange}
            minDate={new Date()}
            inputProps={{
              min: new Date().toISOString().split("T")[0], // Set minimum date to today
            }}
            style={{ marginTop: "16px" }}
          />

          {!selected_Date ? 
          <p style={{ color: "red" }}>
            Please select the date.
          </p>:
          (
            <TextField
              label="Day"
              variant="outlined"
              fullWidth
              value={!Day ? "Not Available" : Day}
              style={{ marginTop: "16px" }}
            />
          )}

          {!isTeacherAvailable ? (
            <p style={{ color: "red" }}>
              Srry! Not available on {selectedDay}.
            </p>
          ) : (
            <>
              <FormControl
                variant="outlined"
                fullWidth
                required
                style={{ marginTop: "16px" }}
              >
                <InputLabel>Time Slot</InputLabel>
                <Select
                  value={selectedTimeSlot}
                  onChange={handleTimeSlotChange}
                  labsel="Time Slot"
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Purpose"
                variant="outlined"
                fullWidth
                value={purpose}
                onChange={handlePurposeChange}
                required
                style={{ marginTop: "16px" }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* Check the TimeSlot is NotAvailable */}
          {!timeSlots.includes("Not Available") && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={
                !selectedDate ||
                !purpose ||
                !selectedTimeSlot ||
                !isTeacherAvailable ||
                !Day
              }
            >
              Book
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialong Box for Connection request */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Send Connection</DialogTitle>
        <DialogContent>
          <TextField
            name="interest"
            id="interest"
            onChange={onchangehandle}
            label="Interest"
            fullWidth
            multiline
            placeholder="Enter a your Interest"
          />
          <TextField
            name="comment"
            id="comment"
            onChange={onchangehandle}
            label="Message"
            fullWidth
            multiline
            placeholder="Enter a message"
          />
          <br></br>
          {Error && <Alert severity="warning">Alert : {Error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConnect}
            color="primary"
            disabled={requestSent}
          >
            Connect
          </Button>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;

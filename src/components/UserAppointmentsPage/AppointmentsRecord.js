import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Grid,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(5),
    backgroundColor: "#f5f5f5",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(2),
  },
  studentName: {
    fontWeight: "bold",
  },
  interestedDomain: {
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  status: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  heading: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  value: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  acceptBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(55),
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    },
  },
}));


const AppointmentRecord = () => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);

  //Function to Fetch the Appointment
  const fetchAppointment = async()=>{
    try {
      const response = await fetch('http://localhost:8080/api/Appointment/StudentFetch',{
        method: 'GET',
        headers:{
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setAppointments(json);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchAppointment();
  })
  
  const handleCancelAppointment = async(appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/Appointment/${appointmentId}/delete`).
      then((response)=>{
      });
      fetchAppointment();
      
    } catch (error) {
        console.error(error);
        alert("Failed to Delete Appointment request")
    }
  };

  return (
    <Grid container spacing={2}>
      {appointments.map((appointment) => (
        <Grid item xs={12} sm={12} md={12} key={appointment.id}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar
                        src={`http://localhost:8080/${appointment.supervisor.image}`}
                        alt="Student"
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.studentName}>
                        {appointment.supervisor.firstName} {" "} {appointment.supervisor.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={classes.interestedDomain}
                      >
                        {appointment.supervisor.occupation}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Grid container spacing={0}>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="body2" className={classes.heading}>
                        Day:
                      </Typography>
                      <Typography variant="body2" className={classes.value}>
                        {appointment.day}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="body2" className={classes.heading}>
                        Time:
                      </Typography>
                      <Typography variant="body2" className={classes.value}>
                        {appointment.timeSlot}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="body2" className={classes.heading}>
                        Date:
                      </Typography>
                      <Typography variant="body2" className={classes.value}>
                        {appointment.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="body2" className={classes.heading}>
                        Purpose:
                      </Typography>
                      <Typography variant="body2" className={classes.value}>
                        {appointment.purpose}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="body2" className={classes.heading}>
                        Status:
                      </Typography>
                      <Typography variant="body2" className={classes.value}>
                        {appointment.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <div>
              {appointment.status === "pending" && (
                <Button
                  variant="contained"
                  className={`${classes.acceptBtn}`}
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  Cancel
                </Button>
              )}
              </div>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppointmentRecord;

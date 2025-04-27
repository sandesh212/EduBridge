import React,{useState,useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import StudentImg from "../Assets/student_1.jpg";
import Grid from "@material-ui/core/Grid";
import { Box, Button } from "@material-ui/core";
import { concatMap } from "rxjs";
import imgsrc from "../uploads/image.jpg";
const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "auto",
    direction: "coloum",
    alignItems: "center",
    justify: "center",
    backgroundColor: "#f8f9fa",
  },
});

const StudentConnectionCard = ({img,FirstName,LastName,interest,comment,connection,onApprove,onReject}) => {

  const classes = useStyles();

  const handleApprovedClick = ()=>{
    onApprove(connection._id);
  }
  const handleRejectClick = () => {
    onReject(connection._id);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={6} alignItems="center">
          <Grid item>
            <Avatar
              alt="Aroon"
              src={`http://localhost:8080/${img}`}
              style={{ height: "120px", width: "120px" }}
            />
          </Grid>
          <Grid item spacing={2}>
            <Typography variant="h6">{FirstName}{' '}{LastName}</Typography>
            <Typography variant="h7">Interest : {interest}</Typography>
            <Grid item>
              <Typography variant="body2" align="justify" color="textSecondary">
                {comment}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Button variant="outlined" color="primary" onClick={handleApprovedClick}>
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleRejectClick}>
              Decline
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
};

export default StudentConnectionCard ;

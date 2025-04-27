import React,{useEffect,useState,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import { ConstructionOutlined } from "@mui/icons-material";
import WorkContext from "../../context/WorkExperience/WorkContext";
import ProjectContext from "../../context/project/ProjectContext";
import SkillContext from "../../context/Skill/SkillContext"
import EducationContext from "../../context/Education/EducationContext";
import { useRadioGroup } from "@mui/material";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow:
      "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#ff5823",
  },
  listItemText: {
    fontWeight: "bold",
  },
  timelineItem: {
    minHeight: "130px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "10px",
    paddingBottom: "10px",
    position: "relative",
    "&:before": {
      position: "absolute",
    },
  },
  timeline: {
    marginLeft: -10,
    paddingInline: "10px",
    marginRight: "auto",
  },
  divider: {
    backgroundColor: "#1f2235",
    height: "1px",
    margin: theme.spacing(2),
  },
  dots: {
    color: "#ff5823",
    fontSize: "23px",
    marginRight: "10px",
  },
  customDate: {
    fontSize: '14px',
    color: 'gray',        
  },
  customDescription: {
    fontSize: '14px',   
    color: 'gray',
    fontWeight: "bold",
  },
  customDot: {
    color: '#ff5823',
    padding: 0,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  customConnector: {
    backgroundColor: "#ff5823" ,
    height: '4px', 
    margin: '0 5px',
  },
}));


function ScreenHeading() {
  return (
    <div className="heading-container">
      <div className="screen-subheading">
        <span>{"My Formal Bio Details"}</span>
      </div>
      <div className="heading-seperator">
        <div className="seperator-line">
          <div className="seperator-blob">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function View({userId}) {

  //Calling Education Context
  const educontext = useContext(EducationContext);
  const {EducationData , fetchEducation } = educontext;

  //Calling Work Context
  const workcontext = useContext(WorkContext);
  const {WorkData,fetchWork} = workcontext;

  //Calling Project Context
  const projectcontext = useContext(ProjectContext)
  const {ProjectData,fetchProject} = projectcontext;

   //Calling Skill Context
   const skillcontext = useContext(SkillContext)
   const {SkillData,fetchSkill} = skillcontext;

function UserEducation() {

    useEffect(() => {
    fetchEducation(userId);
  })

  const classes = useStyles();
  return (

    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Education
      </Typography>
      <Divider className={classes.divider} />
      <List>
        {EducationData.map((Education, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={Education.degree}
              secondary={`${Education.InstituteName}  (${Education.startDate}) - (${Education.endDate})`}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
function WorkHistory() {
  useEffect(() => {
    fetchWork(userId);
  })

  const classes = useStyles();
  return (
<Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Work Experience
      </Typography>
      <Divider className={classes.divider} />
      <List>
        {WorkData.map((Work, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={Work.title}
                secondary={`${Work.employee} (${Work.startDate}) - (${Work.endDate})`}
                classes={{ primary: classes.listItemText}} 
              />
            </ListItem>
            {Work.description && (
              <ListItem style={{ marginTop: -20 }}>
                <ListItemText secondary={Work.description} classes={{secondary: classes.listItemText }}  />
              </ListItem>
            )}
            {index !== Work.length - 1 && (
              <div style={{ marginBottom: 16 }}>
                <Divider />
              </div>
            )}
          </div>
        ))}
      </List>
    </Paper>
  );
}

function Projects() {
  useEffect(() => {
    fetchProject(userId);
  })

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
    <Typography variant="h5" className={classes.title}>
      Projects
    </Typography>
    <Divider className={classes.divider} />
    <Timeline className={classes.timeline}>
      {ProjectData.map((project, index) => (
        <React.Fragment key={index}>
          <TimelineItem className={classes.timelineItem}>
            <TimelineSeparator>
              <TimelineDot className={classes.customDot} variant="outlined">
                <FiberManualRecordIcon fontSize="small" /> {/* Use FiberManualRecordIcon for the diamond shape */}
              </TimelineDot>
              {index < ProjectData.length - 1 && <TimelineConnector className={classes.customConnector} />}
            </TimelineSeparator>
            <TimelineContent className={classes.customContent}>
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                {project.projectTitle}
              </Typography>
              <Typography className={classes.customDate}>
                {`(${project.startDate}) - (${project.endDate})`}
              </Typography>
              <Typography className={classes.customDescription}>
                {project.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </React.Fragment>
      ))}
    </Timeline>
  </Paper>
  );
}

function ProgrammingSkills() {

  useEffect(() => {
    fetchSkill(userId);
  })
  const classes = useStyles();
  return (

    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Programming Skills
      </Typography>
      <Divider className={classes.divider} />
      <List>
        {SkillData.map((Skill, index) => (
          <ListItem key={index}>
            <Typography className={classes.dots}>{"\u2023"}</Typography>
            <ListItemText
              primary={Skill.skillName}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

  return (
    <div>
      <ScreenHeading />
      <UserEducation />
       <WorkHistory />
      <Projects /> 
      <ProgrammingSkills />
    </div>
  );
}

export default View;


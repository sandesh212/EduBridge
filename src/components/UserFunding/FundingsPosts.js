import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Grid,
  Paper,
  Box,
  Divider,
} from "@material-ui/core";
import {
  Link as LinkIcon,
  Description as DescriptionIcon,
} from "@material-ui/icons";
// const [isLink,setIsLink]=useState(true);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  post: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: theme.spacing(1),
  },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginBottom: theme.spacing(1),
  },
  name: {
    marginRight: theme.spacing(1),
  },
  occupation: {
    fontStyle: "italic",
  },
  listItemText: {
    color: "#222",
  },
  documentText: {
    display: "flex",
    alignItems: "center",
    color: "#222",
    fontWeight: "bold",
  },
  documentContainer: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  postedOn: {
    marginTop: theme.spacing(1),
    display: "block",
    marginBottom: theme.spacing(2),
  },
}));

const FundingDetailsView = (props) => {
  // if(props.link==""){
  //   setIsLink(false);
  // }
  const classes = useStyles();

  const handleDownload = (file) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `http://localhost:8080/${file}`;
    downloadLink.download = file;
    downloadLink.click();
  };
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.post}>
        <div className={classes.header}>
          <Avatar
            alt={props.firstName}
            src={`http://localhost:8080/${props.img}`}
            className={classes.avatar}
          />
          <div className={classes.nameContainer}>
            <Typography variant="subtitle1" className={classes.name}>
              {props.firstName} {" "} {props.lastName}
            </Typography>
            <Typography variant="caption" className={classes.occupation}>
              {props.occupation}
            </Typography>
          </div>
        </div>
        <div className={classes.content}>
          <Typography variant="caption" className={classes.postedOn}>
            Posted on {props.postDate}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {props.description}
          </Typography>
          <Divider />
          {props.file &&
            (<Box className={classes.documentContainer}>
              <List>
                <Typography variant="subtitle1">
                  Supporting Material:
                </Typography>
                  <ListItem>
                    <ListItemAvatar>
                      <IconButton
                        rel="noopener noreferrer"
                        onClick={() => handleDownload(props.file)}
                      >
                        
                        <DescriptionIcon />
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemText
                      primary={props.file}
                      className={classes.documentText}
                    />
                  </ListItem>
              </List>
            </Box>)}
          {props.link && 
          (<div className={classes.linkContainer}>
            <div>
              <LinkIcon className={classes.linkIcon} />
              <a
                target="_blank"
                href={`https://${props.link}`}
                rel="noopener noreferrer"
                color="primary"
                variant="body2"
              >
                {props.link}
              </a>
            </div>
          </div>)}
        </div>
      </Paper>
    </div>
  );
};

export default FundingDetailsView;

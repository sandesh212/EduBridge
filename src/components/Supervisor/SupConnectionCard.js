import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Link } from "react-router-dom";

export default function ConnectionCard(props) {
  const {
    recipientFirstName,
    recipientLastName,
    avatarSrc,
    onDelete,
    connection,
  } = props;
  const handleDelete = () => {
    onDelete(connection._id);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title={`${recipientFirstName} ${recipientLastName}`}
        subheader={"Student"}
        action={
          <IconButton aria-label="Cancel" onClick={handleDelete}>
            <PersonRemoveIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Box
          component={Link}
          to={`/StudentProfileView/${connection.user._id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            position: "relative",
            textAlign: "center",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Avatar
            src={`http://localhost:8080/${avatarSrc}`}
            alt="Avatar"
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              filter: isHovered ? "blur(4px)" : "none", 
            }}
          />
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "4px",
              padding: "8px",
              opacity: isHovered ? 1 : 0, 
              transition: "opacity 0.2s ease",
            }}
          >
            <Typography variant="body2">
              <Link
                to={`/StudentProfileView/${connection.user._id}`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                View Profile
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" endIcon={<ChatIcon />} size="small">
            Chat
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

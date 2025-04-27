import { Button, Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import { Avatar, Box } from '@mui/material';
import {Cancel, LanTwoTone } from '@mui/icons-material';
import { Chat as ChatIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function ConnectionCard(props) {
  const { firstName,lastName, sentDate, status, img,connection,onDelete} = props;

  const handleDeleteClick = ()=>{
    onDelete(connection._id);
  }
  const isAccepted = status === 'approved';
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={<Avatar src={`http://localhost:8080/${img}`} />}
        title={`${firstName} ${lastName}`}
        subheader={`Sent on ${sentDate}`}
        action={
          <IconButton aria-label="Cancel" onClick={handleDeleteClick}>
            <Cancel />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Status: {status}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained"
          endIcon={<ChatIcon />}
          size="small"
          disabled={!isAccepted}
        >
          Chat
        </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

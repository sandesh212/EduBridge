import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import { Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack' 
import UserChats from './userChats';
import { useState,useEffect } from 'react';
import PotentialChats from './potentialChats';
import ChatBox from './ChatBox';

function Chat(props) {
  const [user, setuser] = useState([]);
  const {userChats,userChatLoading,updateCurrentChat} = useContext(ChatContext);

  useEffect(() => {
     //Function to get User Details:
  const getUser = async () => {
    //API Calling:
    const response = await fetch(`http://localhost:8080/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setuser(json);
  };
  getUser();
  },[])

  return (
    <>
    <Box sx={{ width: "83%", pt: 2, pl: 2 }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
        <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
            <ChatIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginLeft: "8px", display: "inline-block", verticalAlign: "middle" }}>
            Chats
          </Typography>
        </Box>
        <hr />
        <Box sx={{ pt: 2, pl: 1}}>
          <Container>
            <PotentialChats user={user} />
            {userChats?.length <1 ? null : (
            <Stack direction='horizontal' gap={4} className='align-items-start'>
              <Stack className='flex-grow-0'>=
              <Stack className='message-box flex-grow-0 pe-3' gap={3}>
              {/* {userChatLoading && <p>Loading Chats....</p>} */}
              {userChats?.map((chat,index)=>{
                return (
                  <div key={index} onClick={()=>updateCurrentChat(chat)}>
                    <UserChats chat={chat} user={user}/>
                  </div>
                )
              })}
              </Stack>
              </Stack>
              <ChatBox user={user}></ChatBox>
              </Stack>)}
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Chat
import React,{useContext} from 'react'
import { useFetchRecipientUser } from '../hooks/useFetchRecipient'
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { Avatar} from '@mui/material'; 
import { ChatContext } from "../context/chatContext";

function UserChats({chat,user}) {
    const {RecipientUser} = useFetchRecipientUser(chat , user);
    const {onlineUsers} = useContext(ChatContext);
    const isOnline = onlineUsers?.some((user) => user?.userId === RecipientUser?._id);
    
  return (
    <Stack direction="horizontal" gap={3} className='user-card align-items-cener p-2 justify-content-between'
     role='button'>
        <div className='d-flex'>
        <div className='m-2'>
            <Avatar src={`http://localhost:8080/${RecipientUser?.image}`} height="50px" />
            </div>
            <div className='text-content'>
                <div className="name">{RecipientUser?.firstName} {" "} {RecipientUser?.lastName}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className='d-flex flex-column align-items-end'>
            <div className='date'>12/12/2022</div>
            {/* <div className='this-user-notifications'>2</div> */}
            <span className={isOnline ? 'user-online' : ""}></span>
        </div>
    </Stack>
  )
}

export default UserChats
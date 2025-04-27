import { createContext, useState, useEffect } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/server";
import { useCallback } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatLoading, setuserChatLoading] = useState(null);
  const [userChatError, setuserChatError] = useState(null);
  const [potentialChats, setpotentialChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  //useStates for messages
  const [messages, setMessages] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  //Send Text Message
  const [sendTextMessageError, setsendTextMessageError] = useState(null);
  const [newMessage, setnewMessage] = useState(null);
  //Socket UseState
  const [socket, setsocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);


  //Initiate Socket
  useEffect(() => {
    const NewSocket = io("http://localhost:5000");
    setsocket(NewSocket);

    return () => {
      NewSocket.disconnect();
    };
  }, [user]);
  
  // Add Online Users on Socket Array
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setonlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //Send Chat messages Socket
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //Receive Message Socket
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  //UseEffect for getUserChats
  useEffect(() => {
    const getUserChats = async () => {
      setuserChatLoading(true);
      setuserChatError(null);

      if (user?._id) {
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setuserChatLoading(false);
        if (response.error) {
          return setuserChatError(response);
        }
        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  //Fetch the Current Chat
  const updateCurrentChat = useCallback((chat) => {
    setcurrentChat(chat);
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );
      setMessagesLoading(false);
      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChartId, setTextMessage) => {
      if (!textMessage) return console.log("No message to send");

      const response = await postRequest(`${baseUrl}/messages`, {
        chatId: currentChartId,
        senderId: sender._id,
        text: textMessage,
      });
      if (response.error) {
        return setsendTextMessageError(response);
      }
      setnewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

// UseEffect for getAllUsers
//   useEffect(() => {
//     const getUsers = async () => {
//       const response = await getRequest(`${baseUrl}/users/getAllUsers`);
//       if (response.error) {
//         return console.log("Error fetching users...", response);
//       }
//       const pChats = response.filter((u) => {
//         let isChatCreated = false;
//         if (user._id === u._id) return false;

//         if (userChats) {
//           isChatCreated = userChats?.some((chat) => {
//             return chat.members[0] === u._id || chat.members[1] === u._id;
//           });
//         }
//         return !isChatCreated;
//       });
//       setpotentialChats(pChats);
//     };
//     getUsers();
//   }, [userChats]);

  
  // //UseEffect for getAllUsers
    useEffect(() => {
      const getUsers = async () => {
        try {
          // Replace 'your_backend_api_url' with the actual URL of your API
          const response = await fetch(`${baseUrl}/connection/fetchChatUsers/${user?._id}`);
          const data = await response.json();
  
          if (!response.ok) {
            console.error("Error fetching users...", data);
            return;
          }
  
          const pChats = data.filter((connection) => {
            const userId = user?._id;
  
            if (userId === connection.user?._id) {
              return false;
            }
  
            if (userChats) {
              const isChatCreated = userChats.some((chat) => {
                return chat.members[0] === userId || chat.members[1] === connection.user?._id;
              });
              return !isChatCreated;
            }
            return true;
          });
          setpotentialChats(pChats);
        } catch (error) {
          console.error("Error fetching potential chats:", error);
        }
      };
  
      getUsers();
    }, [userChats, user?._id]); // Will be triggered whenever userChats or user._id changes
  

  

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`, {
      firstId,
      secondId,
    });
    if (response.error) {
      return console.log("Error cheating Chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        userChatLoading,
        userChatError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        messagesLoading,
        messagesError,
        sendTextMessage,
        newMessage,
        sendTextMessageError,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


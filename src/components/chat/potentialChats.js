// import React, { useContext } from "react";
// import { ChatContext } from "../context/chatContext";

// function PotentialChats(props) {
//   const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
//   const { user } = props;

//   return (
//     <div className="all-users">
//       {potentialChats &&
//         potentialChats.map((u, index) => {
//           return (
//             <div
//               className="single-user"
//               key={index}
//               onClick={() => createChat(user._id, u._id)}
//             >
//               {u.firstName} {u.lastName}
//               <span
//                 className={
//                   onlineUsers?.some((user) => user?.userId === u?._id)
//                     ? "user-online"
//                     : ""
//                 }
//               ></span>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
// export default PotentialChats;

import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";

function PotentialChats(props) {
  const { potentialChats, createChat, onlineUsers, userChats } = useContext(ChatContext);
  const { user } = props;

  const [selectedUser, setSelectedUser] = useState(null);

  const [processedChats, setProcessedChats] = useState([]);

  const isChatExists = (user1Id, user2Id) => {
    return userChats?.some(
      (chat) =>
        (chat.members[0] === user1Id && chat.members[1] === user2Id) ||
        (chat.members[0] === user2Id && chat.members[1] === user1Id)
    );
  };

  const createChatWithPotentialUser = (u) => {
    if (!isChatExists(user._id, u._id)) {
      createChat(user._id, u._id);
    }
  };

  useEffect(() => {
    if (potentialChats) {
      potentialChats.forEach((connection) => {
        const u = user._id === connection.user._id ? connection.supervisor : connection.user;

        const isChatCreated = isChatExists(user._id, u._id);

        if (!isChatCreated && !processedChats.includes(u._id)) {
          createChatWithPotentialUser(u);
          setProcessedChats((prevProcessedChats) => [...prevProcessedChats, u._id]);
        }
      });
    }
  }, [potentialChats, processedChats, createChatWithPotentialUser, user, userChats]);

  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats.map((connection, index) => {
          const u = user._id === connection.user._id ? connection.supervisor : connection.user;

          const isChatCreated = isChatExists(user._id, u._id);

          // Check if the potential user is the selected user
          const isSelectedUser = selectedUser && selectedUser._id === u._id;

          return (
            <div
              className={`single-user ${isChatCreated ? "disabled" : ""} ${isSelectedUser ? "selected" : ""}`}
              key={index}
              onClick={() => {
                if (!isChatCreated) {
                  createChatWithPotentialUser(u);
                  setProcessedChats((prevProcessedChats) => [...prevProcessedChats, u._id]);
                }
                setSelectedUser(u); 
              }}
            >
              {u.firstName} {u.lastName}
              <span
                className={
                  onlineUsers?.some((user) => user?.userId === u._id)
                    ? "user-online"
                    : ""
                }
              ></span>
            </div>
          );
        })}
    </div>
  );
}

export default PotentialChats;

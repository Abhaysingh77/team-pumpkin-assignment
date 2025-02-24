import { useState } from "react";
import io from "socket.io-client";
import { UsersList } from "../components/user/UserList";
import ChatWindow from "../components/chat-page/ChatWindow";
import ProfileSidebar from "../components/chat-page/ProfileSidebar";

// const socket = io("http://localhost:8080");
const socket = io("https://team-pumpkin-assignment.onrender.com")

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const userId = localStorage.getItem("userId");

  const selectUser = (user) => {
    if (!user) return;

    localStorage.setItem("selectedUserId", user._id);
    setSelectedUser(user);

    socket.emit("join-room", { senderId: userId, receiverId: user._id }); // Ensure the receiver is in the room

    setMessages([]);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex h-screen bg-white">
      <UsersList
        selectedUser={selectedUser}
        selectUser={selectUser}
        toggleProfile={toggleProfile}
        socket={socket}
      />
      <ChatWindow
        selectedUser={selectedUser}
        toggleProfile={toggleProfile}
        setMessages={setMessages}
        messages={messages}
        socket={socket}
      />
      <ProfileSidebar
        user={selectedUser}
        toggleProfile={toggleProfile}
        showProfile={showProfile}
      />
    </div>
  );
}

export default ChatPage;

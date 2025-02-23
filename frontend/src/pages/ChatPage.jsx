import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getAllUsers } from "../services/user.api";

const socket = io("https://team-pumpkin-assignment.onrender.com");

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.users) {
        setUsers(response.users);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.emit("user-online", loggedInUserId);

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("online-users");
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      socket.emit("send-message", {
        senderId: loggedInUserId,
        receiverId: selectedUser.id,
        message,
      });
      setMessages((prev) => [...prev, { senderId: loggedInUserId, message }]);
      setMessage("");
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer p-3 rounded-lg flex justify-between items-center transition duration-200 ${
                selectedUser?.id === user.id ? "bg-gray-300" : "bg-white"
              } hover:bg-gray-300`}
            >
              {user.name}{" "}
              {onlineUsers.includes(user.id) && (
                <span className="text-green-500">●</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 p-6 flex flex-col">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Chat with {selectedUser.name}
            </h2>
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-100">
              {messages.map((msg, index) => (
                <p
                  key={index}
                  className={`py-2 px-4 my-2 rounded-lg w-fit max-w-xs ${
                    msg.senderId === loggedInUserId
                      ? "bg-green-300 self-end text-right ml-auto"
                      : "bg-white self-start"
                  }`}
                >
                  {msg.message}
                </p>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg outline-none"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <h2 className="text-lg font-semibold text-center">
            Select a user to chat
          </h2>
        )}
      </div>
    </div>
  );
}

export default ChatPage;

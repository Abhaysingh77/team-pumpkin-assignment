import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ChatWindow = ({ selectedUser, toggleProfile, setMessages, messages, socket }) => {
  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket || !selectedUser) return;
  
    const handleMessage = (msg) => {
      console.log("Received message: ", msg);
      setMessages((prev) => [...prev, msg]);
    };
  
    socket.on("receive-message", handleMessage);
  
  }, [socket, selectedUser]);
  

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && selectedUser) {
      socket.emit("send-message", {
        senderId: userId,
        receiverId: selectedUser._id,
        message,
      });
      // setMessages((prev) => [...prev, { senderId: userId, message }]);
      setMessage("");
    }
  };
  return (
    <div className="flex-1 flex flex-col">
      {selectedUser ? (
        <>
          <div className="flex items-center gap-3 p-4 border-b border-[#D9DCE0]">
            <div
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold cursor-pointer"
              onClick={toggleProfile}
            >
              {selectedUser.name.charAt(0)}
            </div>
            <span className="font-semibold">{selectedUser.name}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => {
              if(msg.receiverId === selectedUser._id || msg.senderId === selectedUser._id) {
                return (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-xs my-1 ${
                        msg.senderId === userId
                          ? "bg-blue-100 text-blue-900"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          <form
            onSubmit={sendMessage}
            className="border-t border-[#D9DCE0] p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-[#D9DCE0] rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};
ChatWindow.propTypes = {
  selectedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      senderId: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  setMessages: PropTypes.func.isRequired,
  toggleProfile: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
};

export default ChatWindow;

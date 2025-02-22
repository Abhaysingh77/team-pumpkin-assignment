import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://team-pumpkin-assignment.onrender.com");

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Received message:", msg); // Debugging
      if (typeof msg === "string") {
        setMessages((prevMessages) => [...prevMessages, msg]);
      } else {
        console.error("Invalid message type:", msg);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scrolls only when messages update

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message); // Debugging
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>React Chat App</h2>
      <div style={styles.messagesContainer}>
        <ul style={styles.messagesList}>
          {messages.map((msg, index) => (
            <li key={index} style={styles.messageItem}>
              {msg}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>
      <form style={styles.form} onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  messagesContainer: {
    flex: "1",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#fff",
  },
  messagesList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  messageItem: {
    padding: "10px",
    marginBottom: "5px",
    backgroundColor: "#e1f5fe",
    borderRadius: "5px",
    textAlign: "left",
  },
  form: {
    display: "flex",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default App;

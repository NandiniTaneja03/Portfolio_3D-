import React, { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  // Connect to backend WebSocket
  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8000/chat");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: "bot", text: event.data }]);
    };

    ws.current.onopen = () => console.log("✅ WebSocket connected");
    ws.current.onclose = () => console.log("❌ WebSocket closed");

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(input);
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div style={styles.container}>
      {isOpen ? (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            Website Chatbot
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E2E2FF",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <button style={styles.floatingBtn} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
  },
  floatingBtn: {
    backgroundColor: "#4B49AC",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  chatBox: {
    width: "320px",
    height: "400px",
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  header: {
    backgroundColor: "#4B49AC",
    color: "white",
    padding: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },
  sendBtn: {
    backgroundColor: "#4B49AC",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
  },
};

export default ChatBot;

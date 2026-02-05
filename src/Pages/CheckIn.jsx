import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import InputBar from "../components/InputBar";

export default function CheckIn() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const name = state?.name || "Friend";

  const [messages, setMessages] = useState([
    { type: "bot", text: `Hi ${name}. How was your day?` },
  ]);

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Check-in</h2>
        <button className="end-btn" onClick={() => navigate("/done")}>
          End
        </button>
      </header>

      <div className="chat-box">
        {messages.map((m, i) => (
          <ChatBubble key={i} type={m.type} text={m.text} />
        ))}
      </div>

      <InputBar onSend={handleSend} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LiveKitRoom, RoomAudioRenderer, useVoiceAssistant } from "@livekit/components-react";
import "@livekit/components-styles";

function VoiceAssistant() {
  const { state, audioTrack } = useVoiceAssistant();
  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        {state === "listening" && "🎤 Listening..."}
        {state === "thinking" && "🤔 Thinking..."}
        {state === "speaking" && "🗣️ Speaking..."}
        {state === "idle" && "💬 Ready"}
      </div>
      <p style={{ color: "#666" }}>
        {state === "listening" && "Speak now"}
        {state === "thinking" && "Processing your message"}
        {state === "speaking" && "Agent is responding"}
        {state === "idle" && "Start speaking to begin"}
      </p>
    </div>
  );
}

export default function VoiceRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const name = state?.name || "Friend";
  const [token, setToken] = useState(null);
  const [roomName] = useState(`room-${Date.now()}`);

  useEffect(() => {
    async function setupRoom() {
      try {
        // Create room
        await fetch("http://localhost:3001/create-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomName }),
        });

        // Get token
        const res = await fetch("http://localhost:3001/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomName, identity: name }),
        });
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("Failed to setup room:", err);
      }
    }
    setupRoom();
  }, [roomName, name]);

  if (!token) return <div>Connecting...</div>;

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Voice Check-in</h2>
        <button className="end-btn" onClick={() => navigate("/done")}>
          End
        </button>
      </header>

      <LiveKitRoom
        token={token}
        serverUrl={import.meta.env.VITE_LIVEKIT_URL || "wss://ai-interview-dn3qc5z0.livekit.cloud"}
        connect={true}
        audio={true}
        video={false}
      >
        <VoiceAssistant />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

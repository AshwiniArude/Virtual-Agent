import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="centered">
      <div className="card">
        <h1>Daily Check-in</h1>
        <p>A calm place to pause and talk.</p>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          disabled={!name}
          onClick={() => navigate("/checkin", { state: { name } })}
        >
          Start Check-in
        </button>
      </div>
    </div>
  );
}

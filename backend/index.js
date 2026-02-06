import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { RoomServiceClient, AccessToken } from "livekit-server-sdk";

dotenv.config();

// 1️⃣ Create express app FIRST
const app = express();
app.use(cors());
app.use(express.json());

// 2️⃣ LiveKit config
const livekitUrl = process.env.LIVEKIT_URL;
const livekitApiKey = process.env.LIVEKIT_API_KEY;
const livekitApiSecret = process.env.LIVEKIT_API_SECRET;

const roomClient = new RoomServiceClient(
  livekitUrl,
  livekitApiKey,
  livekitApiSecret
);

// 3️⃣ Health check
app.get("/health", (req, res) => {
  res.json({ status: "backend running" });
});

// 4️⃣ Create room endpoint
app.post("/create-room", async (req, res) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res.status(400).json({ error: "roomName is required" });
  }

  try {
    const room = await roomClient.createRoom({
      name: roomName,
      emptyTimeout: 200,
      maxParticipants: 2,
    });

    res.json({
      message: "room created",
      room,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to create room" });
  }
});

// 5️⃣ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`backend running on port ${PORT}`);
});

app.post("/token", async (req, res) => {
  const { roomName, identity } = req.body;

  if (!roomName || !identity) {
    return res.status(400).json({
      error: "roomName and identity are required",
    });
  }

  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: identity,
        ttl: 60 * 30, // 30 minutes
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    res.json({ token: jwt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to generate token" });
  }
});

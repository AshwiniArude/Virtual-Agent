import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import VoiceRoom from "./Pages/VoiceRoom";
import Goodbye from "./Pages/Goodbye";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/checkin" element={<VoiceRoom />} />
        <Route path="/done" element={<Goodbye />} />
      </Routes>
    </BrowserRouter>
  );
}

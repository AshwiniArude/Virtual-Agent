import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import CheckIn from "./Pages/CheckIn";
import Goodbye from "./Pages/Goodbye";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/done" element={<Goodbye />} />
      </Routes>
    </BrowserRouter>
  );
}

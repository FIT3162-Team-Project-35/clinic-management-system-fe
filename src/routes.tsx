import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";
import Login from "./pages/Login";

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/appointment" element={<Appointments />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default ApplicationRoute;

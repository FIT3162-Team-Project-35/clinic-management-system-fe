import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients"

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/appointment" element={<Appointments />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patients" element={<Patients />} />
    </Routes>
  );
};

export default ApplicationRoute;

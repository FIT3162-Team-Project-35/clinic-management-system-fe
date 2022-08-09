import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/appointment" element={<Appointments />} />
    </Routes>
  );
};

export default ApplicationRoute;

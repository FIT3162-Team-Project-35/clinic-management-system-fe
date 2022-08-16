import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients"
import Encounters from "./pages/Encountets";

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/appointment" element={<Appointments />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/encounter" element = {<Encounters />}/>
    </Routes>
  );
};

export default ApplicationRoute;

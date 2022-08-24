import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Encounters from "./pages/Encountets";
import RequireAuth from "./middleware/RequireAuth";

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Homepage />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/patient" element={<Patients />} />
        <Route path="/encounter" element={<Encounters />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoute;

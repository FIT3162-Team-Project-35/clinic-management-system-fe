import { Routes, Route } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Encounters from "./pages/Encounters";
import RequireAuth from "./middleware/RequireAuth";
import PatientDetails from "./pages/PatientDetails";
import EncounterDetails from "./pages/EncounterDetails";

const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/patient" element={<Patients />}></Route>
        <Route path="/patient/:id" element={<PatientDetails />} />

        <Route path="/encounter" element={<Encounters />} />
        <Route path="/encounter/:id" element={<EncounterDetails />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoute;

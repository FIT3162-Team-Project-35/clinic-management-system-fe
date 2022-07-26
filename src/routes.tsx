import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
const ApplicationRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
};

export default ApplicationRoute;

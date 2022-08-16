import { BrowserRouter } from "react-router-dom";
import ApplicationRoute from "./routes";
import SideBar from "../src/components/SideBar";

function App() {
  return (
    <BrowserRouter>
      <ApplicationRoute />
    </BrowserRouter>
  );
}

export default App;

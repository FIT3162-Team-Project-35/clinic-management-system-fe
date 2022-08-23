import { BrowserRouter } from "react-router-dom";
import ApplicationRoute from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ApplicationRoute />
    </BrowserRouter>
  );
}

export default App;

import { Text, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import { selectCurrentUser } from "../store/auth.slice";
function Home() {
  const user = useSelector(selectCurrentUser);
  return (
    <SideBar active="/home">
      <div>
        <Text fontSize="6xl">Welcome, {user ? user.name : "User"}</Text>
      </div>
    </SideBar>
  );
}

export default Home;

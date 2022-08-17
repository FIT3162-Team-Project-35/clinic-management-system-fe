import { Text, Stack } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
function Home() {
  return (
    <SideBar active="/home">
      <div>
        <Text fontSize="6xl">Clinic Management System</Text>
      </div>
    </SideBar>
  );
}

export default Home;

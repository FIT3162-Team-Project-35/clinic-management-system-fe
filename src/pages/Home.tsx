import { Text, Stack } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
function Home() {
  return (
    <SideBar>
      <div>
        <Text fontSize="6xl">Clinic Management System</Text>
        <PatientTable></PatientTable>
      </div>
    </SideBar>
  );
}

export default Home;

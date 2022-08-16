import { Text } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";

function Patients() {
    return (
      <SideBar>
        <Text fontSize="6xl">Patients Table</Text>
        <PatientTable></PatientTable>
      </SideBar>
    );
  }
  
  export default Patients;
  
import { Text } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";

function Patients() {
    return (
      <div>
        <Text fontSize="6xl">Patients Table</Text>
        <PatientTable></PatientTable>
      </div>
    );
  }
  
  export default Patients;
  
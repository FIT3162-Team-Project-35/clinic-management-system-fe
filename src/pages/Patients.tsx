import { Text } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";

function Patients() {
  return (
    <SideBar active="/patient">
      <PatientTable></PatientTable>
    </SideBar>
  );
}

export default Patients;

import { Text, Stack, Button } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import AppointmentTable from "../components/AppointmentTable";

function Appointments() {
  return (
    <SideBar active={"/appointment"}>
      <AppointmentTable></AppointmentTable>
    </SideBar>
  );
}

export default Appointments;



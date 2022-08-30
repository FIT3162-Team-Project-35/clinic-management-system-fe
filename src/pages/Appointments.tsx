import { Text, Stack, Button } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import AppointmentTable from "../components/AppointmentTable";
import { Helmet } from "react-helmet";

function Appointments() {
  return (
    <SideBar active={"/appointment"}>
      <Helmet>
        <title>Appointments</title>
      </Helmet>
      <AppointmentTable></AppointmentTable>
    </SideBar>
  );
}

export default Appointments;

import { Text, Stack, Button } from "@chakra-ui/react";
import SideBar from "../components/SideBar";

function Appointments() {
  return (
    <SideBar>
      <div>
        <Text fontSize="6xl">Appointment</Text>
        <Text fontSize="5xl"></Text>
        <Button colorScheme="blue">Button</Button>
      </div>
    </SideBar>
  );
}

export default Appointments;

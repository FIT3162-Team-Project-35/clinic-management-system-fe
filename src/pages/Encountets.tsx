import SideBar from "../components/SideBar";
import { Text } from "@chakra-ui/react";

function Encounters() {
  return (
    <SideBar active="/encounter">
      <Text fontSize="6xl">Encounter</Text>
    </SideBar>
  );
}

export default Encounters;

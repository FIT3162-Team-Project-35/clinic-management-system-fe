import SideBar from "../components/SideBar";
import { Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

function Encounters() {
  return (
    <SideBar active="/encounter">
      <Helmet>
        <title>Encounters</title>
      </Helmet>
      <Text fontSize="6xl">Encounters</Text>
    </SideBar>
  );
}

export default Encounters;

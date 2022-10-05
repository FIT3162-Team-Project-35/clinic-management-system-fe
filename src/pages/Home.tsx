import { Text, Stack, HStack, Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { changeDatetoTZ } from "../common/utils";
import DashboardCard from "../components/DashboardCard";
import DataBox from "../components/DataBox";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import { store } from "../store";
import { selectCurrentToken, selectCurrentUser } from "../store/auth.slice";
function Home() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  return (
    <SideBar active="/">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <div>
        <Text fontSize="6xl">Welcome, {user ? user.name : "User"}</Text>
      </div> */}
      <DataBox></DataBox><br/>
      <HStack>
        <DashboardCard></DashboardCard>
      </HStack>
    </SideBar>
  );
}

export default Home;

import { Text, Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { changeDatetoTZ } from "../common/utils";
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
      <div>
        <Text fontSize="6xl">Welcome, {user ? user.name : "User"}</Text>
      </div>
    </SideBar>
  );
}

export default Home;

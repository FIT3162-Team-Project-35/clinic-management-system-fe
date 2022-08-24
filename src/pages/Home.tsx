import { Text, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import { store } from "../store";
import { selectCurrentToken, selectCurrentUser } from "../store/auth.slice";
function Home() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  console.log(store.getState());
  return (
    <SideBar active="/">
      <div>
        <Text fontSize="6xl">Welcome, {user ? user.name : "User"}</Text>
      </div>
    </SideBar>
  );
}

export default Home;

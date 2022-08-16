import { Text, Stack } from "@chakra-ui/react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
function Home() {
  return (
    <SideBar>
      <div>
        <Text fontSize="6xl">Clinic Management System</Text>
        <PatientTable></PatientTable>
        {/* <Text fontSize="4xl">(4xl) In love with React & Next</Text>
      <Text fontSize="3xl">(3xl) In love with React & Next</Text>
      <Text fontSize="2xl">(2xl) In love with React & Next</Text>
      <Text fontSize="xl">(xl) In love with React & Next</Text>
      <Text fontSize="lg">(lg) In love with React & Next</Text>
      <Text fontSize="md">(md) In love with React & Next</Text>
      <Text fontSize="sm">(sm) In love with React & Next</Text>
      <Text fontSize="xs">(xs) In love with React & Next</Text> */}
      </div>
    </SideBar>
  );
}

export default Home;

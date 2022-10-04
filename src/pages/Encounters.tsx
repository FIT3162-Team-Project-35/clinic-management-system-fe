import SideBar from "../components/SideBar";
import { Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import EncounterTable from "../components/EncounterTable";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";

function Encounters() {
  const [encounters, setEncounters] = useState([]);
  useEffect(() => {
    ApiService.get(`/encounter`)
      .then((response) => {
        setEncounters(response.data);
        // dispatch(addPatients(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SideBar active="/encounter">
      <Helmet>
        <title>Encounters</title>
      </Helmet>
      <EncounterTable encounters={encounters}></EncounterTable>
    </SideBar>
  );
}

export default Encounters;

import SideBar from "../components/SideBar";
import { Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import EncounterTable from "../components/EncounterTable";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import AddEncounterButton from "../components/AddEncounterButton";
import { addEncounters, selectEncounters } from "../store/encounter.slice";
import { useDispatch, useSelector } from "react-redux";

function Encounters() {
  const [patients, setPatients] = useState([]);
  const dispatch = useDispatch();
  const { encounters } = useSelector(selectEncounters);

  useEffect(() => {
    ApiService.get(`/encounter`)
      .then((response) => {
        dispatch(addEncounters(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    ApiService.get(`/patient`)
      .then((response) => {
        setPatients(response.data);
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
      <AddEncounterButton e={encounters} p={patients} />
      <EncounterTable encounters={encounters}></EncounterTable>
    </SideBar>
  );
}

export default Encounters;

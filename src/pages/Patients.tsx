import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import ApiService from "../services/ApiService";

function Patients() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    ApiService.get(`/patient`)
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      })
      .catch((err) => {
        console.log(err);
        //   if (err && err.response) {
        //     console.log(err)
        //   }
      });
  }, []);

  return (
    <SideBar active="/patient">
      <PatientTable patients={patients}></PatientTable>
    </SideBar>
  );
}

export default Patients;

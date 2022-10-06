import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import AddPatientButton from "../components/AddPatientButton";
import BasicUsage from "../components/EditPatientButton";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import ApiService from "../services/ApiService";
import { addPatients, selectPatients } from "../store/patient.slice";

function Patients() {
  const dispatch = useDispatch();
  const { patients } = useSelector(selectPatients);
  useEffect(() => {
    ApiService.get(`/patient`)
      .then((response) => {
        dispatch(addPatients(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SideBar active="/patient">
      {/* <Box w={{ base: "300px", md: "400px", lg: "500px" }}> */}
      <Helmet>
        <title>Patients</title>
      </Helmet>
      <AddPatientButton p={patients} />
      <PatientTable patients={patients}></PatientTable>
      {/* //</Box> */}
    </SideBar>
  );
}

export default Patients;

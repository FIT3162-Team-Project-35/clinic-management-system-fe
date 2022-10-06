import { Text, Stack, HStack, Box } from "@chakra-ui/react";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { changeDatetoTZ } from "../common/utils";
import DashboardCard from "../components/DashboardCard";
import DataBox from "../components/DataBox";
import PatientTable from "../components/PatientTable";
import SideBar from "../components/SideBar";
import ApiService from "../services/ApiService";
import { store } from "../store";
import { selectCurrentToken, selectCurrentUser } from "../store/auth.slice";
import { addEncounters, selectEncounters } from "../store/encounter.slice";
import { addPatients, selectPatients } from "../store/patient.slice";
function Home() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [lastThreeDaysData, setLastThreeDaysData] = useState([]);

  useEffect(() => {
    ApiService.get(`/encounter`)
      .then((response) => {
        setEncounters(response.data);
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

    ApiService.get(`/appointment`)
      .then((response) => {
        setAppointments(response.data);

        const today = new Date();
        const threeDaysAgo = subDays(today, 2);

        const threeDays = eachDayOfInterval({
          start: threeDaysAgo,
          end: today,
        });
        const sDayData = [];
        threeDays.forEach((day) => {
          let count = 0;
          const dt = format(day, "dd/MM/yyyy");

          response.data.forEach((ap: any) => {
            const apDt = format(new Date(ap.start), "dd/MM/yyyy");
            if (dt === apDt) {
              count += 1;
            }
          });
          sDayData.push({ argument: dt, value: count });
        });

        setLastThreeDaysData(sDayData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SideBar active="/">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <div>
        <Text fontSize="6xl">Welcome, {user ? user.name : "User"}</Text>
      </div> */}
      <DataBox
        patients={patients}
        appointments={appointments}
        encounters={encounters}
      ></DataBox>
      <br />
      {/* <HStack> */}
      <DashboardCard
        patients={patients}
        appointments={appointments}
        encounters={encounters}
        graphData={lastThreeDaysData}
      ></DashboardCard>
      {/* </HStack> */}
    </SideBar>
  );
}

export default Home;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

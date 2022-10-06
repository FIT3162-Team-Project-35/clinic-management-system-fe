import * as React from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { format } from "date-fns";

export const PatientGraph = ({
  appointments,
  graphData,
}: {
  appointments: Array<any>;
  graphData: any;
}) => {
  // const lastThreeDays = [];
  // const reversedAppointments = appointments.reverse();
  // console.log(reversedAppointments)
  // let i = 0;
  // while (lastThreeDays.length < 3) {
  //   const dt = format(new Date(reversedAppointments[i].start), "dd/MM/yyyy");
  //   if (!lastThreeDays.includes(dt)) {
  //     lastThreeDays.push(dt);
  //     i++;
  //   }
  // }
  const data = [
    { argument: "09.10.2022", value: 45 },
    { argument: "10.10.2022", value: 50 },
    { argument: "11.10.2022", value: 30 },
    { argument: "12.10.2022", value: 45 },
  ];
  return (
    <div className="container-responsive">
      <Chart data={graphData} width={500} height={300}>
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries valueField="value" argumentField="argument" color="blue" />
      </Chart>
    </div>
  );
};

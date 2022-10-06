import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

const data = [
  { argument: "09.10.2022", value: 45 },
  { argument: "10.10.2022", value: 50 },
  { argument: "11.10.2022", value: 30 },
  { argument: "12.10.2022", value: 45 },
];

export default () => (
  <div className="container-responsive">
    <Chart data={data} width = {500} height={300}>
      <ArgumentAxis />
      <ValueAxis />
      <LineSeries valueField="value" argumentField="argument" color='blue'/>
    </Chart>
  </div>
);
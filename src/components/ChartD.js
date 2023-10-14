import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatusSelection from "./StatusSelection";
import week from "./../JSON/week.json";

const data = [
  {
    name: "MON",
    total: 24,
  },
  {
    name: "TUE",
    total: 13,
  },
  {
    name: "WED",
    total: 9,
  },
  {
    name: "THU",
    total: 39,
  },
  {
    name: "FRI",
    total: 48,
  },
  {
    name: "SAT",
    total: 38,
  },
  {
    name: "SUN",
    total: 43,
  },
];

export default class ChartD extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/bar-chart-has-no-padding-jphoc";

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            width: 30,
            marginLeft: 79,
            marginTop: -2,
            marginBottom: 10,
            display: "flex",
          }}
        >
          <StatusSelection
            label={"Select Week"}
            labelSelect={"Select Week"}
            json={week}
          ></StatusSelection>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="total" fill="#3E7C1F" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

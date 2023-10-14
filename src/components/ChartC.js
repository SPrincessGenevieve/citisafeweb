import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./chartCss.css";
const data = [
  { name: "Driving without Driver’s License", value: 40 },
  { name: "Driving with SP Only", value: 30 },
  { name: "Failure to carry Driver’s License", value: 23 },
  { name: "Expired Driver’s License", value: 34 },
  {
    /*
  { name: "Expired Registration", value: 23 },
  { name: "Unregistered Motor Vehicle", value: 0 },
  { name: "Plates not firmly attached and visible", value: 20 },
  { name: "No Early Warning Device", value: 22 },
  { name: "Operating without Mayor’s Permit", value: 21 },
  { name: "Overloading", value: 10 },
  { name: "Unsafe load", value: 4 },
  { name: "Colorum Operation", value: 0 },
  { name: "No Franchise", value: 40 },
  { name: "Double Parking", value: 45 },
  { name: "Parked at No Parking Sign", value: 25 },
  { name: "Arrogance of discoutesy", value: 56 },
  { name: "Disregarding Traffic Officer", value: 45 },
  { name: "Disregarding Traffic Sign", value: 34 },
  { name: "Failure to Dim Headlights", value: 23 },
  { name: "No Helmet when Driving", value: 0 },
  { name: "Obstruction to Traffic", value: 20 },
  { name: "Over Speeding", value: 12 },
  { name: "Reckless Driving", value: 23 },
  { name: "No Canvass Cover", value: 45 },
  { name: "Violation of No Entry Sign", value: 12 },
  { name: "Noise Muffler", value: 11 },
  { name: "Refusal to convey passenger to proper dstn.", value: 2 },*/
  },
];
const COLORS = ["#2B5517", "#3DBC00", "#88FA52", "#476B36"];

export default class ChartC extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    const filteredData = data.filter((entry) => entry.value !== 0);

    return (
      <div style={{ marginTop: -20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ width: "90%" }}>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <div className="sub-category">
                <div
                  style={{
                    backgroundColor: "#2B5517",
                    width: 25,
                    height: 12,
                    borderRadius: 10,
                  }}
                ></div>
                <p className="violation-title">
                  Driving without Driver’s License
                </p>
              </div>
              <div className="sub-category">
                <div
                  style={{
                    backgroundColor: "#3DBC00",
                    width: 25,
                    height: 12,
                    borderRadius: 10,
                  }}
                ></div>
                <p className="violation-title">Driving with SP Only</p>
              </div>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <div className="sub-category">
                <div
                  style={{
                    backgroundColor: "#88FA52",
                    width: 25,
                    height: 12,
                    borderRadius: 10,
                  }}
                ></div>
                <p className="violation-title">
                  Failure to carry Driver’s License
                </p>
              </div>
              <div className="sub-category">
                <div
                  style={{
                    backgroundColor: "#476B36",
                    width: 25,
                    height: 12,
                    borderRadius: 10,
                  }}
                ></div>
                <p className="violation-title">Expired Driver’s License</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

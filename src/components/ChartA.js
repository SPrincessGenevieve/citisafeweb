import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'JAN',
    total: 42,

  },
  {
    name: 'FEB',
    total: 15,

  },
  {
    name: 'MAR',
    total: 32,

  },
  {
    name: 'APR',
    total: 40,

  },
  {
    name: 'MAY',
    total: 34,

  },
  {
    name: 'JUN',
    total: 23,

  },
  {
    name: 'JUL',
    total: 34,

  },
  {
    name: 'AUG',
    total: 25,

  },
  {
    name: 'SEP',
    total: 45,

  },
  {
    name: 'OCT',
    total: 25,

  },
  {
    name: 'NOV',
    total: 34,

  },
  {
    name: 'DEC',
    total: 37,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

  state = {
    opacity: {
      total: 1
    },
  };

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  render() {
    const { opacity } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#3E7C1F" fill="#3E7C1F" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'MON',
    total: 2400,
  },
  {
    name: 'TUE',
    total: 1398,
  },
  {
    name: 'WED',
    total: 9800,
  },
  {
    name: 'THU',
    total: 3908,
  },
  {
    name: 'FRI',
    total: 4800,
  },
  {
    name: 'SAT',
    total: 3800,
  },
  {
    name: 'SUN',
    total: 4300,
  },
];

export default class ChartD extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';

  render() {
    return (
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
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#7D8ECC" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

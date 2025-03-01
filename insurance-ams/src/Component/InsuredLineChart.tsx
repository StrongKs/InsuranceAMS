"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    clients: 900,
  },
  {
    name: "Feb",
    clients: 1200,
  },
  {
    name: "Mar",
    clients: 1100,
  },
  {
    name: "Apr",
    clients: 1300,
  },
  {
    name: "May",
    clients: 1600,
  },
  {
    name: "Jun",
    clients: 1000,
  },
  {
    name: "Jul",
    clients: 1400,
  },
  {
    name: "Aug",
    clients: 1600,
  },
  {
    name: "Sep",
    clients: 1900,
  },
  {
    name: "Oct",
    clients: 2500,
  },
  {
    name: "Nov",
    clients: 2200,
  },
  {
    name: "Dec",
    clients: 2300,
  },
];

const InsuredLineChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Client History Count</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="clients"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsuredLineChart;

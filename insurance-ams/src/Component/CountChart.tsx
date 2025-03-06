"use client";

import Image from "next/image";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Personal",
    uv: 200,
    pv: 100000,
    fill: "#6BEFCF",
  },
  {
    name: "Commercial",
    uv: 125,
    pv: 99567,
    fill: "#78CCF1",
  },
  {
    name: "Total",
    uv: 325,
    pv: 100000,
    fill: "white",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const countChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Policies</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
      </div>
      {/* Chart */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={30}
            data={data}
            endAngle={360}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="uv"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* Bottom (commercial vs personal) */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lightCyan rounded-full" />
          <h1 className="font-bold">200</h1>
          <h2 className="text-xs text-gray-500">Personal (61.54%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-accentBlue rounded-full" />
          <h1 className="font-bold">125</h1>
          <h2 className="text-xs text-gray-500">Commercial (48.46%)</h2>
        </div>
      </div>
    </div>
  );
};

export default countChart;

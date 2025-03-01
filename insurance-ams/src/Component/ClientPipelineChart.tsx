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
  FunnelChart,
  Funnel,
  LabelList,
  LabelProps,
} from "recharts";

// import LineChart from "recharts";
// import Line from "recharts";
// import XAxis from "recharts";
// import YAxis from "recharts";
// import CartesianGrid from "recharts";
// import Tooltip from "recharts";
// import Legend from "recharts";
// import ResponsiveContainer from "recharts";

// LEAD
// CONSULT
// QUOTE
// CLOSED_ACCEPTED
// CLOSED_DENIED

const data = [
  {
    name: "Lead",
    income: 4000,
    fill: "#8884d8",
  },
  {
    name: "Consult",
    income: 3800,
    fill: "#83a6ed",
  },
  {
    name: "Quote",
    income: 1500,
    fill: "#8dd1e1",
  },
  {
    name: "Denied",
    income: 900,
    fill: "#82ca9d",
  },
  {
    name: "Accepted",
    income: 600,
    fill: "#4DB8A4",
  },
];

// Sets the value label on each section
const CustomLabel: React.FC<LabelProps> = ({ x, y, width, height, value }) => {
  const cx =
    (typeof x === "number" ? x : 0) +
    (typeof width === "number" ? width / 2 : 0);
  const cy =
    (typeof y === "number" ? y : 0) +
    (typeof height === "number" ? height / 2 : 0);

  return (
    <text
      x={cx}
      y={cy}
      fill="#000"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

const ClientPipelineChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Client Pipeline</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="income" data={data} isAnimationActive>
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            />
            <LabelList content={<CustomLabel />} dataKey="income" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientPipelineChart;

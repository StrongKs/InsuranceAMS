"use client";

import Image from "next/image";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  LabelProps,
} from "recharts";

// Define the data structure
interface PipelineData {
  name: string;
  income: number;
  fill: string;
}

interface ClientPipelineChartProps {
  data: PipelineData[];
}

// Optional Custom Label Function
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

const ClientPipelineChart: React.FC<ClientPipelineChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Client Pipeline</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
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
            <LabelList
              content={<CustomLabel />}
              dataKey="income"
              position="inside"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientPipelineChart;

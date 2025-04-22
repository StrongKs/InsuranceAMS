"use client";

import Image from "next/image";
import React from "react";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// Define the expected prop type
interface PolicyData {
  name: string;
  total: number;
  fill: string;
}

interface CountChartProps {
  data: PolicyData[];
}

const CountChart: React.FC<CountChartProps> = ({ data }) => {
  // Calculate active & non-active dynamically
  const activePolicy =
    data.find((policy) => policy.name === "Personal")?.total || 0;
  const nonActivePolicy =
    data.find((policy) => policy.name === "Commercial")?.total || 0;

  const totalPolicies = activePolicy + nonActivePolicy;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Policies</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
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
              dataKey="total"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* Bottom Stats */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-lightCyan rounded-full" />
          <h1 className="font-bold">{activePolicy}</h1>
          <h2 className="text-xs text-gray-500">
            Active (
            {totalPolicies > 0
              ? ((activePolicy / totalPolicies) * 100).toFixed(2)
              : "0.00"}
            %)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-accentBlue rounded-full" />
          <h1 className="font-bold">{nonActivePolicy}</h1>
          <h2 className="text-xs text-gray-500">
            Non-Active (
            {totalPolicies > 0
              ? ((nonActivePolicy / totalPolicies) * 100).toFixed(2)
              : "0.00"}
            %)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;

"use client";
import { useGetErrorsHistoryQuery } from "@/app/redux/api";
import React from "react";
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

// Define the type for our data
type ChartData = {
  name: string;
  value: number;
};

// Sample data for the chart
const data: ChartData[] = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 300 },
  { name: "Page C", value: 200 },
  { name: "Page D", value: 278 },
  { name: "Page E", value: 189 },
];

const ChartsPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsPage;

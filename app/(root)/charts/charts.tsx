"use client";
import { useGetErrorsHistoryQuery } from "@/app/redux/api";
import Loader from "@/components/shared/loader";
import { ErrorForm } from "@/types";
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

const Charts = () => {
  const { data, isLoading, isError } = useGetErrorsHistoryQuery("");

  // extract records from your API structure
  const records: ErrorForm[] = data?.data || [];

  // transform data: Count occurrences of each error type
  const errorCounts = records.reduce((acc: Record<string, number>, record) => {
    record.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

  // convert data format suitable for recharts
  const chartData = Object.keys(errorCounts).map((errorName) => ({
    error: errorName,
    devices: errorCounts[errorName],
  }));

  return (
    <div className="m-3">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex h-screen items-center justify-center text-red-500">
          Error loading data
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="error"
                textAnchor="end"
                angle={-45}
                interval={0}
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar
                dataKey="devices"
                name="Number of Devices"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Charts;

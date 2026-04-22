"use client";
import { useGetErrorsHistoryQuery } from "@/app/redux/api";
import Spinner from "@/components/shared/spinner";
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

const ChartsPage = () => {
  const { data, isLoading, isError } = useGetErrorsHistoryQuery("");
  {
    /*}
  // Loading and Error States
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading data...
      </div>
    );
  if (isError)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading data
      </div>
    );
*/
  }

  isLoading && <Spinner />;
  isError && (
    <div className="flex h-screen items-center justify-center text-red-500">
      {" "}
      Error loading data{" "}
    </div>
  );

  // Extract records from your API structure
  const records: ErrorForm[] = data?.data || [];

  // Transform data: Count occurrences of each error type
  const errorCounts = records.reduce((acc: Record<string, number>, record) => {
    record.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

  // Convert tisLoading && ( <Spinner /> )
  const chartData = Object.keys(errorCounts).map((errorName) => ({
    error: errorName,
    devices: errorCounts[errorName],
  }));

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="error" textAnchor="end" interval={0} height={70} />
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
  );
};

export default ChartsPage;

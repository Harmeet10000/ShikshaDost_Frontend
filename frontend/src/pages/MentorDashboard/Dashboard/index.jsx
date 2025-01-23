import React from "react";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Bar,
  BarChart,
  YAxis,
  LabelList,
} from "recharts";

const menteesChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const revenueChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center justify-between p-4 bg-white rounded shadow-md">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Total Revenue</h2>
            <p className="text-2xl font-semibold text-green-600">$50,000</p>
          </div>
          <FaDollarSign className="text-4xl text-green-500" />
        </div>
        <div className="flex items-center justify-between p-4 bg-white rounded shadow-md">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Total Mentees</h2>
            <p className="text-2xl font-semibold text-purple-600">300</p>
          </div>
          <FaUsers className="text-4xl text-purple-500" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mentees Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Mentees Overview</h3>
          <BarChart
            width={500}
            height={300}
            data={menteesChartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} stroke="#E5E7EB" />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#4B5563" }}
            />
            <XAxis dataKey="desktop" type="number" hide />
            <Bar dataKey="desktop" fill="#1E90FF" radius={4}>
              <LabelList dataKey="month" position="insideLeft" fontSize={12} fill="#1F2937" />
              <LabelList dataKey="desktop" position="right" fontSize={12} fill="#4B5563" />
            </Bar>
          </BarChart>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Revenue Trends</h3>
          <LineChart
            width={500}
            height={300}
            data={revenueChartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "#4B5563" }}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="#32CD32"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

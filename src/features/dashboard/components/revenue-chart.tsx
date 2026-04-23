import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Thg 1", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 2", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 3", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 4", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 5", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 6", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 7", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 8", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 9", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 10", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 11", total: Math.floor(Math.random() * 50) + 50 },
  { name: "Thg 12", total: Math.floor(Math.random() * 50) + 50 },
];

export const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}tr`}
        />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

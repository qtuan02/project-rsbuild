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

const data = [
  { name: "Tháng 6", thu: 4000, chi: 2400 },
  { name: "Tháng 7", thu: 3000, chi: 1398 },
  { name: "Tháng 8", thu: 2000, chi: 9800 },
  { name: "Tháng 9", thu: 2780, chi: 3908 },
  { name: "Tháng 10", thu: 1890, chi: 4800 },
  { name: "Tháng 11", thu: 2390, chi: 3800 },
];

export const CashFlowChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--chart-1)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--chart-1)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="thu"
            name="Tổng thu"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="chi"
            name="Tổng chi"
            fill="var(--chart-2)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

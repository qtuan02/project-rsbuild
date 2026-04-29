import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Sector,
  type PieSectorShapeProps,
} from "recharts";

const data = [
  { name: "Đã thuê", value: 42, fill: "var(--chart-1)" },
  { name: "Trống", value: 6, fill: "var(--chart-2)" },
];

export const OccupancyDonutChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            shape={(props: PieSectorShapeProps) => (
              <Sector {...props} fill={props.fill} />
            )}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

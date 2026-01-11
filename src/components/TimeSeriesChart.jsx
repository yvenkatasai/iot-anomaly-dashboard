import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatTime(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function TimeSeriesChart({ data }) {
  if (!data || data.length === 0) {
    return <div style={{ height: 300 }}>Waiting for data…</div>;
  }

  const chartData = data.map((d) => ({
    x: d.time.getTime(),   // numeric, monotonic
    value: d.value,
  }));

  return (
    <div style={{ width: "100%", height: 360 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            dataKey="x"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => formatTime(new Date(v))}
          />

          <YAxis domain={["auto", "auto"]} />

          <Tooltip
            labelFormatter={(v) => formatTime(new Date(v))}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
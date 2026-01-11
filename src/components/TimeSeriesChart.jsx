import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TimeSeriesChart({ data }) {
  const normal = data.filter(d => !d.isAnomaly);
  const anomalies = data.filter(d => d.isAnomaly);

  const chartData = {
    datasets: [
      {
        label: "Normal Values",
        data: normal.map(d => ({
          x: d.parsedTime,
          y: d.value
        })),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        pointRadius: 3,
        tension: 0.3
      },
      {
        label: "Anomalies",
        data: anomalies.map(d => ({
          x: d.parsedTime,
          y: d.value,
          reason: d.reason
        })),
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        pointRadius: 8,
        showLine: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: { unit: "minute" }
      },
      y: {
        title: {
          display: true,
          text: "Sensor Value"
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.raw.reason
              ? `Value: ${ctx.raw.y} | ${ctx.raw.reason}`
              : `Value: ${ctx.raw.y}`
        }
      }
    }
  };

  return (
    <div style={{ height: 350 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

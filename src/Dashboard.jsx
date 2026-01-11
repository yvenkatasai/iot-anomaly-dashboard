import { useEffect, useState } from "react";
import { useFirestore } from "./hooks/useFirestore";
import { useStats } from "./hooks/useStats";
import TimeSeriesChart from "./components/TimeSeriesChart";

export default function Dashboard() {
  const { data, connected } = useFirestore();

  const [paused, setPaused] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  // Freeze data on pause
  useEffect(() => {
    if (!paused) {
      setDisplayData(data);
    }
  }, [data, paused]);

  const { total, anomalies, rate, avg } = useStats(displayData);

  return (
    <div style={{ padding: 24 }}>
      <h1>IoT Anomaly Detection Dashboard</h1>

      <p>
        Status:{" "}
        {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </p>

      <button
        onClick={() => setPaused((p) => !p)}
        style={{ marginBottom: 12 }}
      >
        {paused ? "▶ Resume" : "⏸ Pause"}
      </button>

      <div style={{ marginBottom: 16 }}>
        <strong>Total:</strong> {total} &nbsp;
        <strong>Anomalies:</strong> {anomalies} &nbsp;
        <strong>Rate:</strong> {rate.toFixed(2)}% &nbsp;
        <strong>Avg:</strong> {avg.toFixed(2)}
      </div>

      <TimeSeriesChart data={displayData} />
    </div>
  );
}
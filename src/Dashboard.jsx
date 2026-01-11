import { useFirestore } from "./hooks/useFirestore";
import { useStats } from "./hooks/useStats";
import TimeSeriesChart from "./components/TimeSeriesChart";
import AnomalyTable from "./components/AnomalyTable";

export default function Dashboard() {
  const { data, connected } = useFirestore();
  const { total, anomalies, rate } = useStats(data);

  return (
    <div style={container}>
      {/* ---------- Header ---------- */}
      <header style={header}>
        <h1 style={title}>IoT Anomaly Detection Dashboard</h1>
        <p style={status}>
          Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </p>
      </header>

      {/* ---------- Stats Cards ---------- */}
      <section style={statsGrid}>
        <StatCard title="Total Readings" value={total} />

        <StatCard
          title="Anomalies"
          value={anomalies}
          color="#ef4444"
        />

        <StatCard
          title="Anomaly Rate"
          value={`${rate.toFixed(2)}%`}
          color={rate > 15 ? "#ef4444" : "#10b981"}
        />
      </section>

      {/* ---------- Chart ---------- */}
      <section style={section}>
        <h2 style={sectionTitle}>Live Sensor Readings</h2>
        <TimeSeriesChart data={data} />
      </section>

      {/* ---------- Anomaly Table ---------- */}
      <section style={section}>
        <AnomalyTable data={data} />
      </section>
    </div>
  );
}

/* ======================================================
   Helper Components
====================================================== */

function StatCard({ title, value, color = "#111" }) {
  return (
    <div style={card}>
      <p style={cardTitle}>{title}</p>
      <p style={{ ...cardValue, color }}>{value}</p>
    </div>
  );
}

/* ======================================================
   Styles (inline for now, Tailwind later)
====================================================== */

const container = {
  padding: 24,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  background: "#f3f4f6",
  minHeight: "100vh",
};

const header = {
  marginBottom: 24,
};

const title = {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 4,
};

const status = {
  fontSize: 14,
};

const statsGrid = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 32,
};

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  minWidth: 180,
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const cardTitle = {
  fontSize: 14,
  color: "#6b7280",
  marginBottom: 8,
};

const cardValue = {
  fontSize: 28,
  fontWeight: "bold",
};

const section = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 20,
  marginBottom: 32,
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const sectionTitle = {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 12,
};


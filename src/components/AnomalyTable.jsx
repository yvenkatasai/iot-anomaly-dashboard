export default function AnomalyTable({ data }) {
  const anomalies = data
    .filter(d => d.isAnomaly)
    .sort((a, b) => b.parsedTime - a.parsedTime)
    .slice(0, 50);

  if (anomalies.length === 0) {
    return (
      <div
        style={{
          padding: 24,
          marginTop: 24,
          border: "1px dashed #d1d5db",
          borderRadius: 8,
          textAlign: "center",
          color: "#065f46",
        }}
      >
        <strong>✅ No anomalies detected</strong>
        <p style={{ fontSize: 14, marginTop: 4 }}>
          All sensor readings are within normal parameters
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Anomaly Alerts</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 12,
        }}
      >
        <thead>
          <tr style={{ background: "#fee2e2" }}>
            <th style={th}>Time</th>
            <th style={th}>Sensor</th>
            <th style={th}>Value</th>
            <th style={th}>Reason</th>
          </tr>
        </thead>

        <tbody>
          {anomalies.map(a => (
            <tr key={a.id} style={{ background: "#fff5f5" }}>
              <td style={td}>
                {a.parsedTime.toLocaleString()}
              </td>
              <td style={td}>
                <span style={badge}>{a.sensorId}</span>
              </td>
              <td style={{ ...td, color: "#dc2626", fontWeight: "bold" }}>
                {a.value}
              </td>
              <td style={td}>{a.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Styles ---------- */

const th = {
  textAlign: "left",
  padding: 12,
  borderBottom: "2px solid #fecaca",
};

const td = {
  padding: 12,
  borderBottom: "1px solid #fee2e2",
  fontSize: 14,
};

const badge = {
  background: "#e0e7ff",
  padding: "2px 8px",
  borderRadius: 12,
  fontSize: 12,
};

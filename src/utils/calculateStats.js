export default function calculateStats(data = []) {
  const vals = data.map((d) => (typeof d.value === 'number' ? d.value : NaN)).filter((v) => !Number.isNaN(v));
  const count = vals.length;
  if (count === 0) return { count: 0, avg: 0, min: null, max: null, anomalies: [] };
  const sum = vals.reduce((a, b) => a + b, 0);
  const avg = sum / count;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  // Simple anomaly detection: values more than 50% away from average
  const anomalies = data.filter((d) => typeof d.value === 'number' && Math.abs(d.value - avg) > Math.abs(avg) * 0.5);
  return { count, avg, min, max, anomalies };
}

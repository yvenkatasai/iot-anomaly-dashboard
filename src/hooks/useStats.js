export function useStats(data) {
  const total = data.length;

  const anomalies = data.filter((d) => d.isAnomaly).length;

  const rate = total > 0 ? (anomalies / total) * 100 : 0;

  const avg =
    total > 0
      ? data.reduce((sum, d) => sum + d.value, 0) / total
      : 0;

  return { total, anomalies, rate, avg };
}
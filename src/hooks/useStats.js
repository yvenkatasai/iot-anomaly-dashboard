import { useMemo } from "react";

export function useStats(data) {
  return useMemo(() => {
    const total = data.length;
    const anomalies = data.filter(d => d.isAnomaly).length;
    const rate = total === 0 ? 0 : (anomalies / total) * 100;

    return {
      total,
      anomalies,
      rate
    };
  }, [data]);
}


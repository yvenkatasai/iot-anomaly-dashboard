import React from 'react';

export default function StatsCards({ stats }) {
  if (!stats) return null;
  return (
    <div style={{ display: 'flex', gap: 12, padding: 12 }}>
      <div>Count: <strong>{stats.count}</strong></div>
      <div>Avg: <strong>{Number(stats.avg).toFixed(2)}</strong></div>
      <div>Min: <strong>{stats.min}</strong></div>
      <div>Max: <strong>{stats.max}</strong></div>
    </div>
  );
}

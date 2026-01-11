import React from 'react';

export default function EmptyState({ message = 'No data available' }) {
  return (
    <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>{message}</div>
  );
}

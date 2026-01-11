import React from 'react';

export default function ConnectionStatus({ online = true }) {
  return (
    <div style={{ padding: 8 }}>
      Status: <strong style={{ color: online ? 'green' : 'red' }}>{online ? 'Connected' : 'Disconnected'}</strong>
    </div>
  );
}

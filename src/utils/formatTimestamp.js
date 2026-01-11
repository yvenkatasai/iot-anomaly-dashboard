export default function formatTimestamp(ts) {
  if (!ts) return '';
  // Firestore Timestamp has toDate(), otherwise assume epoch ms or Date
  const date = typeof ts.toDate === 'function' ? ts.toDate() : (ts instanceof Date ? ts : new Date(ts));
  return date.toLocaleString();
}

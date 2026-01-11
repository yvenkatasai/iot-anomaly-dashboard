export function validateDocument(data) {
  if (!data) return false;

  const hasValidTimestamp =
    typeof data.timestamp === "string" ||
    typeof data.timestamp?.toDate === "function";

  return (
    typeof data.sensorId === "string" &&
    hasValidTimestamp &&
    typeof data.value === "number" &&
    typeof data.isAnomaly === "boolean" &&
    typeof data.reason === "string"
  );
}

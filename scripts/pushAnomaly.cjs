const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function pushAnomaly() {
  await db.collection("sensor_data").add({
    sensorId: "sensor-1",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    value: 99.9, // VERY HIGH VALUE
    isAnomaly: true, // FORCE TRUE
    reason: "Forced anomaly from terminal test",
  });

  console.log("🚨 FORCED ANOMALY INSERTED");
}

pushAnomaly()
  .then(() => process.exit())
  .catch(err => {
    console.error("ERROR:", err);
    process.exit(1);
  });

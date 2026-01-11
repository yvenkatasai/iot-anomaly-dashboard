import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { validateDocument } from "../utils/validateDocument";

export function useFirestore() {
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "sensor_data"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setConnected(true);
        const docs = [];

        snapshot.forEach((doc) => {
          const raw = doc.data();

          if (!validateDocument(raw)) return;

          // ✅ SAFELY HANDLE FIRESTORE TIMESTAMP OR STRING
          let parsedTime;
          if (typeof raw.timestamp === "string") {
            parsedTime = new Date(raw.timestamp);
          } else if (raw.timestamp?.toDate) {
            parsedTime = raw.timestamp.toDate();
          }

          // ❌ Skip invalid timestamps
          if (!parsedTime || isNaN(parsedTime.getTime())) return;

          docs.push({
            id: doc.id,
            ...raw,
            parsedTime,
          });
        });

        // Oldest → newest for chart
        docs.sort((a, b) => a.parsedTime - b.parsedTime);

        // ✅ Keep only recent points (better chart performance)
        setData(docs.slice(-50));
      },
      (error) => {
        console.error("Firestore error:", error);
        setConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, connected };
}

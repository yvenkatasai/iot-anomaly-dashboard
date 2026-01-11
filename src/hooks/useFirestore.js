import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useFirestore() {
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // 🔥 KEY FIX: DESCENDING ORDER
    const q = query(
      collection(db, "sensor_data"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows = snapshot.docs
          .map((doc) => {
            const d = doc.data();
            return {
              value: Number(d.value),
              isAnomaly: Boolean(d.isAnomaly),
              time: d.timestamp.toDate(), // local Date
            };
          })
          .reverse(); // 🔥 OLD → NEW for chart

        setData(rows);
        setConnected(true);
      },
      () => setConnected(false)
    );

    return () => unsubscribe();
  }, []);

  return { data, connected };
}
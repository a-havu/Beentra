import { useEffect } from "react";

const INTERVAL_MS = 3 * 60 * 1000; // 3 minutes

export function useHeartbeat() {
  useEffect(() => {
    let isMounted = true;

    const ping = async () => {
      try {
        const response = await fetch("/api/heartbeat", {
          method: "POST",
        });

        if (response.status === 401) {
          return;
        }

        if (!response.ok) {
          console.error("Heartbeat failed:", response.status);
        }
      } catch (error) {
        // ignore errors after unmount
        if (isMounted) {
          console.error("Heartbeat request failed:", error);
        }
      }
    };

    ping();
    const id = setInterval(ping, INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);
}

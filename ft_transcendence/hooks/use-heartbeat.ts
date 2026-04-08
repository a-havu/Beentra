import { useEffect } from "react";

const INTERVAL_MS = 180 * 1000; // ping every 5 minutes

export function useHeartbeat() {
	useEffect(() => {
		const ping = () => fetch("/api/heartbeat",
			{ method: "POST" }
		);

		ping(); // immediate ping on mount
		const id = setInterval(ping, INTERVAL_MS);

		return () => clearInterval(id);
	}, []);
}
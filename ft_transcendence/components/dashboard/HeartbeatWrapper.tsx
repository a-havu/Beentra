"use client";
import { useHeartbeat } from "@/hooks/use-heartbeat";

export function HeartbeatWrapper() {
	useHeartbeat();
	return null;
}
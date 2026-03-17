"use client";

import { useActivityTracker } from "@/hooks/use-activity-tracker";

export function TrackActivity() {
	useActivityTracker();

	return null;
}
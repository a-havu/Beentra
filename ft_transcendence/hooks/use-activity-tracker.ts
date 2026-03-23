// "use client"

// import { useEffect } from "react"

// export function useActivityTracker() {
// 	useEffect(() => {
// 		const checkActivity = async () => {
// 			try {
// 				await fetch("/api/user/activity", {
// 					method: "POST",
// 				});
// 			} catch (err) {
// 				console.error("Activity failure:", err);
// 			}
// 		};

// 		checkActivity();
// 		let intervalTime = 3 * 60 * 1000; // 3 minutes in milliseconds

// 		const checkInterval = setInterval(() => {
// 			checkActivity();
// 		}, intervalTime);

// 		return () => {
// 			clearInterval(checkInterval);
// 		}
// 	}, []);
// }  REMOVE

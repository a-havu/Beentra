
"use client";

import { Statistics } from "./Statistics";

// Default welcome message
function WelcomeView() {
	return (
		<div className="bg-white rounded-lg shadow p-12 text-center">
			<h1 className="text-4xl font-bold text-[#255a8b] mb-4">
				Welcome to Admin Dashboard
			</h1>
			<p className="text-lg text-gray-600 mb-8">
				Select an option from the sidebar to get started
			</p>
			<Statistics />
		</div>
	);
}

export default WelcomeView;
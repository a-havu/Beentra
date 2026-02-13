import { UsersTable } from "./UsersTable";
import { useState } from "react";

// export function Sidebar ({ userEmail}: { userEmail: string}) {
//     return (
//         <aside className="w-64 bg-white shadow-lg p-6 border-r border-gray-300">
//             <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//                 <p className="text-sm text-gray-600">Welcome, {userEmail}</p>
//             </div>
//             <nav className="space-y-3">
//             <button className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition">
//                 Users
//                 </button>
//             <button className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition">
//                 Events
//                 </button>
//             <button className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition">
//                 Projects
//                 </button>
//             </nav>
//         </aside>
//     );
// }

export function Sidebar({ userEmail, onButtonClick }: { userEmail: string, onButtonClick: any }) {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 border-r border-gray-300">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome, {userEmail}</p>
      </div>

      <nav className="space-y-3">
        <button
          onClick={() => onButtonClick("users")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Users
        </button>

        <button
          onClick={() => onButtonClick("events")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Events
        </button>

        <button
          onClick={() => onButtonClick("projects")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Projects
        </button>
		<button
          onClick={() => onButtonClick("welcome")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Back Home
        </button>
      </nav>
    </aside>
  );
}

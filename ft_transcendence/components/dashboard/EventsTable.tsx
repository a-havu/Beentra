
// "use client";
// import { useState, useEffect } from "react";
// import FunctionalButtons from "./pages/FunctionalButtons";

// type Event = {
//   id: string;
//   title: string;
//   location: string;
//   organizer: string;
//   description: string;
// };

// export function EventsTable() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         setIsLoading(true);

//         const response = await fetch("/api/events", {
//           method: "GET",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch Events");
//         }

//         const data = await response.json();
//         setEvents(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching events: ", err);
//         setError("Failed to load events. Please try again");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchEvents();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-lg shadow p-12 text-center">
//         <p className="text-gray-600">Loading events...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-lg shadow p-12 text-center">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-blue-900">Event Management</h2>
//         <button className="p-4 text-left px-4 py-3 bg-green-300 border shadow-lg border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-green-600 hover:border-white hover:text-white transition">
//           Add Event
//         </button>
//       </div>

//       <div>
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b-2 border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">ID</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Title</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Location</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Organizer</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Modify</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {events.map((event) => (
//               <tr key={event.id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 text-center text-sm text-gray-900">{event.id}</td>
//                 <td className="px-6 py-4 text-center text-sm text-gray-600">{event.title}</td>
//                 <td className="px-6 py-4 text-center text-sm text-gray-600">{event.location}</td>
//                 <td className="px-6 py-4 text-center text-sm text-gray-600">{event.organizer}</td>
//                 <td className="px-6 py-4">
//                   {/* ✅ SIMPLE! Just one component */}
//                   <FunctionalButtons
//                     id={event.id}
//                     onDeleted={() => {
//                       setEvents((prev) => prev.filter((e) => e.id !== event.id));
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }












"use client";
import { useState } from "react";
import { useEffect } from "react";
import DeleteEventButton from "../events/DeleteEventButton";
import EditEvent from "../events/EditEvent";
import { Button } from "../ui/Button";
import FunctionalButtons from "./pages/FunctionalButtons";

type Event = {
  id: string;
  title: string;
  location: string;
  organizer: string;
  description: string;
};

export function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingEvent, setAddingEvent] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);

        const response = await fetch("/api/events", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Events");
        }

        const data = await response.json();

        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setError("Failed to load events. Please try again");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Event Management</h2>
          <Button
		  	variant="adding"
			size="large"
			onClick={() => setAddingEvent(true)}
		  	>
				Add event
		  </Button>
		  {/* <button
            className="p-4
				 text-left
				 px-4
				 py-3
				 bg-green-300
				 border
				 shadow-lg
				 border-gray-300
				 rounded-lg
				 text-lg
				 font-bold
				 text-gray-900
				 hover:bg-green-600
				 hover:border-white
				 hover:text-white transition"
          >
            Add Event
          </button> */}
        </div>
        <div>
          {/* Table header */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Organizer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Modify
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => {
                return (
                  <tr key={event.id} className="hover:bg-gray-50 transition">
                    <td className="px6 py-4 text-center text-sm text-gray-900">
                      {event.id}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.title}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.location}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.organizer}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
						<Button
							variant="edit"
							onClick={() => setEditingId(event.id)}
							>
								Edit
						</Button>
                        {/* <button
                          onClick={() => setEditingId(event.id)}px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm
                          className=""
                        >
                          Edit
                        </button> */}

                        <DeleteEventButton
                          id={event.id}
                          onDeleted={() => {
                            setEvents((prev) =>
                              prev.filter((e) => e.id !== event.id)
                            );
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setEditingId(null)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>

            <EditEvent id={editingId} />
          </div>
        </div>
      )}
    </>
  );
}

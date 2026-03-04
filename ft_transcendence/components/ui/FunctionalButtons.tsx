





// THIS DOES NOT WORK YET, WILL COME BACK TO IT




// "use client";

// import { useState } from "react";
// import DeleteEventButton from "../events/DeleteEventButton";
// import EditEvent from "../events/EditEvent";

// type Props = {
//   id: string;
//   onDeleted: () => void;  // Callback when event is deleted
// };

// export function FunctionalButtons({ id, onDeleted }: Props) {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <>
//       {/* Action Buttons */}
//       <div className="flex gap-2">
//         {/* Edit Button */}
//         <button
//           onClick={() => setIsEditing(true)}
//           className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//         >
//           Edit
//         </button>

//         {/* Delete Button */}
//         <DeleteEventButton
//           id={id}
//           onDeleted={onDeleted}
//         />
//       </div>

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
//             {/* Close button */}
//             <button
//               onClick={() => setIsEditing(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               ✕
//             </button>

//             {/* Edit form */}
//             <EditEvent id={id} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

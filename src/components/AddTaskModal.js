// // src/components/AddTaskModal.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import makeId from "../utils/id";

// export default function AddTaskModal({ isOpen, onClose, initialStatus = "todo" }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Work");
//   const [priority, setPriority] = useState("Low");
//   const dispatch = useDispatch();

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return alert("Title required");
//     const newTask = {
//       id: makeId(),
//       title: title.trim(),
//       description: description.trim(),
//       category,
//       priority,
//       status: initialStatus,
//       createdAt: Date.now(),
//     };
//     dispatch({ type: "ADD_TASK", payload: newTask });
//     // reset and close
//     setTitle("");
//     setDescription("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
//       <div className="relative bg-white rounded-lg p-6 z-10 w-full max-w-md">
//         <h3 className="text-lg font-semibold mb-4">Add Task</h3>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             className="w-full p-2 border rounded"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             className="w-full p-2 border rounded"
//             rows="4"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <div className="flex gap-2">
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
//               <option>Work</option>
//               <option>Personal</option>
//               <option>Urgent</option>
//             </select>
//             <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 border rounded">
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded">Add</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// src/components/AddTaskModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import makeId from "../utils/id";

export default function AddTaskModal({ isOpen, onClose, initialStatus = "todo" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    const newTask = {
      id: makeId(),
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status: initialStatus,
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded focus:ring focus:ring-violet-200"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded focus:ring focus:ring-violet-200"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 border rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 flex-wrap">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

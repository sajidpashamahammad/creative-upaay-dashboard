// // src/components/Navbar.js
// import React from "react";

// export default function Navbar({ onAddTask }) {
//   return (
//     <header className="flex items-center justify-between p-5 bg-white border-b">
//       <div>
//         <h1 className="text-3xl font-extrabold">Mobile App</h1>
//         <div className="text-sm text-gray-500">Overview</div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="hidden sm:flex items-center -space-x-2">
//           <img className="w-9 h-9 rounded-full border-2" src="https://i.pravatar.cc/40?img=32" alt="a" />
//           <img className="w-9 h-9 rounded-full border-2" src="https://i.pravatar.cc/40?img=5" alt="b" />
//           <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm border-2">+2</div>
//         </div>

//         <button
//           onClick={onAddTask}
//           className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700"
//         >
//           + Add Task
//         </button>
//       </div>
//     </header>
//   );
// }

// src/components/Navbar.js
import React from "react";

export default function Navbar({ onAddTask, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-5 bg-white border-b">
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          ☰
        </button>

        <div>
          <h1 className="text-3xl font-extrabold">Mobile App</h1>
          <div className="text-sm text-gray-500">Overview</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center -space-x-2">
          <img
            className="w-9 h-9 rounded-full border-2"
            src="https://i.pravatar.cc/40?img=32"
            alt="a"
          />
          <img
            className="w-9 h-9 rounded-full border-2"
            src="https://i.pravatar.cc/40?img=5"
            alt="b"
          />
          <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm border-2">
            +2
          </div>
        </div>

        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700"
        >
          + Add Task
        </button>
      </div>
    </header>
  );
}

// // src/components/Sidebar.js
// import React from "react";

// export default function Sidebar({ projects = ["Mobile App", "Website Redesign", "Design System"] }) {
//   return (
//     <aside className="w-64 min-h-screen bg-white border-r hidden md:block">
//       <div className="p-6">
//         <div className="text-2xl font-bold">Project <span className="text-violet-600">M.</span></div>
//         <div className="text-sm text-gray-500 mt-1">Project management</div>
//       </div>

//       <nav className="px-4">
//         <ul className="space-y-1 text-gray-700">
//           <li className="py-2 px-2 rounded hover:bg-gray-50">Home</li>
//           <li className="py-2 px-2 rounded hover:bg-gray-50">Messages</li>
//           <li className="py-2 px-2 rounded hover:bg-gray-50">Tasks</li>
//           <li className="py-2 px-2 rounded hover:bg-gray-50">Members</li>
//         </ul>

//         <div className="mt-6 text-xs text-gray-400 uppercase">My Projects</div>
//         <ul className="mt-3 space-y-2">
//           {projects.map((p, i) => (
//             <li
//               key={p}
//               className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
//                 ${i === 0 ? 'bg-violet-50 text-violet-700 font-semibold' : 'hover:bg-gray-100'}`}
//             >
//               <span>{p}</span>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }


// src/components/Sidebar.js
import React from "react";

export default function Sidebar({ projects = ["Mobile App", "Website Redesign", "Design System"], sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          bg-white border-r fixed inset-y-0 left-0 z-30 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 w-64 md:relative md:translate-x-0
        `}
      >
        <div className="p-6">
          <div className="text-2xl font-bold">
            Project <span className="text-violet-600">M.</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">Project management</div>
        </div>

        <nav className="px-4">
          <ul className="space-y-1 text-gray-700">
            <li className="py-2 px-2 rounded hover:bg-gray-50">Home</li>
            <li className="py-2 px-2 rounded hover:bg-gray-50">Messages</li>
            <li className="py-2 px-2 rounded hover:bg-gray-50">Tasks</li>
            <li className="py-2 px-2 rounded hover:bg-gray-50">Members</li>
          </ul>

          <div className="mt-6 text-xs text-gray-400 uppercase">My Projects</div>
          <ul className="mt-3 space-y-2">
            {projects.map((p, i) => (
              <li
                key={p}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
                  ${i === 0 ? "bg-violet-50 text-violet-700 font-semibold" : "hover:bg-gray-100"}`}
              >
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}



// src/components/TaskCard.js
import React from "react";
import { useDispatch } from "react-redux";

const priorityColorMap = {
  Low: "bg-yellow-300",
  Medium: "bg-orange-300",
  High: "bg-red-300"
};

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const stripe = priorityColorMap[task.priority] || "bg-gray-300";

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  const handleStatusChange = (e) => {
    dispatch({ type: "UPDATE_TASK", payload: { id: task.id, updates: { status: e.target.value } } });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className={`h-1 ${stripe}`} />
      <div className="p-4 relative">
        <button onClick={handleDelete} className="absolute right-3 top-3 text-gray-400">×</button>
        <h4 className="font-semibold">{task.title}</h4>
        <p className="text-sm text-gray-500 mt-2">{task.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-gray-400">{task.category}</div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400">{task.priority}</div>

            <select value={task.status} onChange={handleStatusChange} className="text-xs p-1 border rounded">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard; // ✅ default export

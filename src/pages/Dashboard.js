
// src/pages/Dashboard.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import Board from "../components/Board";
import AddTaskModal from "../components/AddTaskModal";

export default function Dashboard() {
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          onAddTask={() => setModalOpen(true)}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Filters */}
        <FilterBar
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          search={search}
          setSearch={setSearch}
        />

        {/* Board */}
        <Board category={category} priority={priority} search={search} />
      </div>

      {/* Add Task Modal */}
      <AddTaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

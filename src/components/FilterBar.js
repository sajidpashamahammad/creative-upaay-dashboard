

export default function FilterBar({ category, setCategory, priority, setPriority, search, setSearch }) {
  return (
    <div className="mx-4 my-4">
      <div className="flex flex-col md:flex-row gap-3 items-center bg-white rounded-lg p-4 shadow-sm">
        <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded-md bg-white">
          <option value="All">All categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select value={priority} onChange={e => setPriority(e.target.value)} className="p-2 border rounded-md bg-white">
          <option value="All">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 p-2 border rounded-md bg-gray-50"
        />
      </div>
    </div>
  );
}

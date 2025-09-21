import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function Column({ column, tasks = [], filters }) {
  // Apply filters here (category/priority/search)
  const filtered = tasks.filter(task => {
    if (!task) return false;
    const { category, priority, title, description } = task;
    if (filters.category !== 'All' && category !== filters.category) return false;
    if (filters.priority !== 'All' && priority !== filters.priority) return false;
    if (filters.search && !(title.toLowerCase().includes(filters.search.toLowerCase()) || (description || '').toLowerCase().includes(filters.search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{column.title}</h3>
        <span className="text-sm text-gray-500">{filtered.length}</span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[150px] space-y-3 ${snapshot.isDraggingOver ? 'bg-gray-50' : ''} p-1 rounded`}
          >
            {filtered.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// // src/components/Board.js
// import React, { useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import TaskCard from "./TaskCard";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// /*
//   Props:
//     filters = { category, priority, search }
// */
// export default function Board({ category, priority, search }) {
//   const dispatch = useDispatch();
//   const tasks = useSelector(s => s.tasks.tasks || []);

//   const columnsOrder = ["todo", "inprogress", "done"];
//   const columnLabels = { todo: "To Do", inprogress: "In Progress", done: "Done" };

//   // apply filters and compute grouped arrays
//   const grouped = useMemo(() => {
//     const filtered = tasks.filter(t => {
//       if (category && category !== "All" && t.category !== category) return false;
//       if (priority && priority !== "All" && t.priority !== priority) return false;
//       if (search && search.trim() && !(`${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
//       return true;
//     });
//     return {
//       todo: filtered.filter(t => t.status === "todo"),
//       inprogress: filtered.filter(t => t.status === "inprogress"),
//       done: filtered.filter(t => t.status === "done"),
//     };
//   }, [tasks, category, priority, search]);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;
//     if (source.droppableId === destination.droppableId && source.index === destination.index) return;

//     // make shallow copies
//     const sourceList = Array.from(grouped[source.droppableId]);
//     const destList = Array.from(grouped[destination.droppableId]);

//     // remove from source
//     const [moved] = sourceList.splice(source.index, 1);
//     // update moved's status
//     const updatedMoved = { ...moved, status: destination.droppableId };

//     // insert into destination
//     destList.splice(destination.index, 0, updatedMoved);

//     // rebuild final tasks array by column order (preserves other tasks)
//     const finalTasks = [
//       ... (source.droppableId === "todo" ? sourceList : (destination.droppableId === "todo" ? destList : grouped.todo)),
//       ... (source.droppableId === "inprogress" ? sourceList : (destination.droppableId === "inprogress" ? destList : grouped.inprogress)),
//       ... (source.droppableId === "done" ? sourceList : (destination.droppableId === "done" ? destList : grouped.done)),
//     ].flat();

//     // BUT: above could produce duplicates/empty depending on which column changed. Simpler approach:
//     // Build columns individually then concat in order:
//     const newCols = {};
//     columnsOrder.forEach(col => {
//       if (col === source.droppableId) newCols[col] = sourceList;
//       else if (col === destination.droppableId) newCols[col] = destList;
//       else newCols[col] = grouped[col];
//     });
//     const newAll = [...newCols.todo, ...newCols.inprogress, ...newCols.done];

//     // dispatch the full new list to preserve ordering
//     dispatch({ type: "SET_TASKS", payload: newAll });
//   };

//   return (
//     <div className="px-6 pb-12">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex gap-6">
//           {columnsOrder.map(colId => (
//             <div key={colId} className="flex-1">
//               <div className="bg-white rounded-lg p-4 h-full min-h-[200px]">
//                 <div className="flex items-center justify-between mb-4">
//                   <h4 className="font-semibold">{columnLabels[colId]}</h4>
//                   <div className="text-sm text-gray-400">{grouped[colId].length}</div>
//                 </div>

//                 <Droppable droppableId={colId}>
//                   {(provided) => (
//                     <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4 min-h-[80px]">
//                       {grouped[colId].map((task, index) => (
//                         <Draggable draggableId={task.id} index={index} key={task.id}>
//                           {(draggableProvided) => (
//                             <div
//                               ref={draggableProvided.innerRef}
//                               {...draggableProvided.draggableProps}
//                               {...draggableProvided.dragHandleProps}
//                             >
//                               <TaskCard task={task} />
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }


// src/components/Board.js
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Make sure this lib is installed

export default function Board({ category, priority, search }) {
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.tasks || []);

  const columnsOrder = ["todo", "inprogress", "done"];
  const columnLabels = { todo: "To Do", inprogress: "In Progress", done: "Done" };

  const grouped = useMemo(() => {
    const filtered = tasks.filter(t => {
      if (category && category !== "All" && t.category !== category) return false;
      if (priority && priority !== "All" && t.priority !== priority) return false;
      if (search && search.trim() && !(`${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
    return {
      todo: filtered.filter(t => t.status === "todo"),
      inprogress: filtered.filter(t => t.status === "inprogress"),
      done: filtered.filter(t => t.status === "done"),
    };
  }, [tasks, category, priority, search]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(grouped[source.droppableId]);
    const destList = Array.from(grouped[destination.droppableId]);

    const [moved] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, { ...moved, status: destination.droppableId });

    const newCols = {};
    columnsOrder.forEach(col => {
      if (col === source.droppableId) newCols[col] = sourceList;
      else if (col === destination.droppableId) newCols[col] = destList;
      else newCols[col] = grouped[col];
    });

    dispatch({ type: "SET_TASKS", payload: [...newCols.todo, ...newCols.inprogress, ...newCols.done] });
  };

  return (
    <div className="px-4 md:px-6 pb-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {columnsOrder.map(colId => (
            <div key={colId} className="flex-1">
              <div className="bg-white rounded-lg p-4 h-full min-h-[200px] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{columnLabels[colId]}</h4>
                  <div className="text-sm text-gray-400">{grouped[colId].length}</div>
                </div>

                <Droppable droppableId={colId}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4 min-h-[80px]">
                      {grouped[colId].map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(draggableProvided) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

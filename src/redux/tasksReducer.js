// src/redux/tasksReducer.js
const initialState = {
  tasks: [
    // seed sample tasks (optional) - will be replaced by localStorage if available
    {
      id: 't-1',
      title: 'project1',
      description: 'good project',
      category: 'Work',
      priority: 'Low',
      status: 'todo',
      createdAt: Date.now(),
    },
    {
      id: 't-2',
      title: 'dfdfd',
      description: 'gfgfgfg',
      category: 'Work',
      priority: 'Low',
      status: 'done',
      createdAt: Date.now(),
    }
  ]
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.payload.id ? { ...t, ...action.payload.updates } : t))
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };

    case 'SET_TASKS':
      // replace full list (useful for drag end re-order)
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
}

// src/redux/store.js
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('appState');
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  // redux devtools support if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

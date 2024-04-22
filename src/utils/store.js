import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { addTask, deleteTask, moveTask } from "./taskActions";

// Actions for task management
const taskActions = (set) => ({
  addTask: addTask(set),
  deleteTask: deleteTask(set),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: moveTask(set),
});

const logMiddleware = (config) => (set, get, api) =>
  config((...args) => {
    console.log("Action dispatched:", args);
    set(...args);
  }, get, api);

export const useStore = create(
  logMiddleware(
    devtools(
      persist(
        (set) => ({
          tasks: [],
          draggedTask: null,
          ...taskActions(set)
        }),
        { name: "taskStore" }
      )
    )
  )
);

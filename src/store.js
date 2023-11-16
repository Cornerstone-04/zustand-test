import { create } from "zustand";
import PropTypes from "prop-types";

const store = (set) => ({
  tasks: [
    { title: "Test", state: "PLANNED" },
    { title: "New", state: "ONGOING" },
  ],
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  draggedTask: null,
  setDraggedTask: (title) => set({ draggedTask: title }),
});

store.propTypes = {
  set: PropTypes.any.isRequired,
};

export const useStore = create(store);

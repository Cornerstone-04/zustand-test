const addTask = (set) => (title, state) => {
  set(
    (prev) => ({ tasks: [...prev.tasks, { title, state }] }),
    false,
    "addTask"
  );
};

const deleteTask = (set) => (title) => {
  set((prev) => ({ tasks: prev.tasks.filter((task) => task.title !== title) }));
};

const moveTask = (set) => (title, newState) => {
  set(
    (prev) => ({
      tasks: prev.tasks.map((task) =>
        task.title === title ? { ...task, state: newState } : task
      ),
    }),
    false,
    "moveTask"
  );
};

export { addTask, deleteTask, moveTask };

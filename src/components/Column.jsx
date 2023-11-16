import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);

  return (
    <div
      className="column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        setDraggedTask(null);
        console.log(draggedTask);
      }}
    >
      <div className="title-wrapper">
        <p>{state}</p>
        <button onClick={open ? () => setOpen(false) : () => setOpen(true)}>
          <FaPlus />
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <Modal
          typing={(e) => setText(e.target.value)}
          text={text}
          action={(e) => {
            e.preventDefault();
            addTask(text, state);
            setText("");
            setOpen(false);
          }}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
};

Column.propTypes = {
  state: PropTypes.any.isRequired,
};

export default Column;

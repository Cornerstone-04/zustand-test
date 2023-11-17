import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        setDrop(false)
        moveTask(draggedTask, state);
        setDraggedTask(null);
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

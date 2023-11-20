import { useState } from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames";
import { useFormik } from "formik";
import { todoSchema } from "../schema";

const Column = ({ state }) => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const { errors, touched, handleChange, handleSubmit, values } = useFormik({
    initialValues: { todo: "" },
    validationSchema: todoSchema,
    onSubmit: (values) => {
      addTask(values.todo, state);
      setOpen(false);
    },
  });

  return (
    <div
      className={classNames("column", { drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={() => setDrop(false)}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="title-wrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(!open)}>
          <FaPlus />
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <Modal
          typing={handleChange}
          text={values.todo}
          action={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          close={() => setOpen(false)}
          errorMessage={errors.todo && touched.todo ? errors.todo : ""}
        />
      )}
    </div>
  );
};

Column.propTypes = {
  state: PropTypes.string.isRequired,
};

export default Column;

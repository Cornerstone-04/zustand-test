import { useState } from "react";
import Task from "./Task";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames";
import { useFormik } from "formik";
import { todoSchema } from "../schema";
import { useStore } from "../utils/store";

const Column = ({ state }) => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { addTask, setDraggedTask, draggedTask, moveTask, tasks } = useStore();
  const tasksList = tasks.filter((task) => task.state === state);

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
      {tasksList.map((task) => (
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

export default Column;

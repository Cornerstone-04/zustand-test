import classNames from "classnames";
import PropTypes from "prop-types";
import { useStore } from "../store";
import { FaTrash } from "react-icons/fa";

// const STATUS = "PLANNED";
const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div
      className="task cursor-grab"
      draggable={true}
      onDragStart={setDraggedTask(task.title)}
    >
      <div>{task.title}</div>
      <div className="bottom-wrapper">
        <div>
          <FaTrash
            onClick={() => deleteTask(task.title)}
            className="text-red-600 cursor-pointer"
          />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Task;

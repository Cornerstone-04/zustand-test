import classNames from "classnames";
import { useStore } from "../utils/store";
import { FaTrash } from "react-icons/fa";

const Task = ({ title }) => {
  const { deleteTask, setDraggedTask, tasks } = useStore();
  const task = tasks.find((task) => task.title === title);

  return (
    <div
      className="task cursor-grab"
      draggable={true}
      onDragStart={() => setDraggedTask(task.title)}
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

export default Task;

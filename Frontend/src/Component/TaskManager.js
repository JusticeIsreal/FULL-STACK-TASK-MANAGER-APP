import { useContext } from "react";
import AppContext from "../Context/AppProvider";

function TaskManager() {
  const { newTask, taskInput, postTask } = useContext(AppContext);

  return (
    <form className="task-input-form">
      <input
        className="task-input"
        type="text"
        value={newTask}
        onChange={(e) => taskInput(e)}
      />
      <button className="task-input-submit-btn" onClick={(e) => postTask(e)}>
        SUBMIT
      </button>
    </form>
  );
}

export default TaskManager;

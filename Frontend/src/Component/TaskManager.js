import { useContext } from "react";
import AppContext from "../Context/AppProvider";

function TaskManager() {
  const { newTask, taskInput, postTask } = useContext(AppContext);

  return (
    <div>
      <div>
        <h1>Task Manager form</h1>
        <form>
          <input type="text" value={newTask} onChange={(e) => taskInput(e)} />

          <button onClick={(e) => postTask(e)}>SUBMIT FORM</button>
        </form>
      </div>
    </div>
  );
}

export default TaskManager;

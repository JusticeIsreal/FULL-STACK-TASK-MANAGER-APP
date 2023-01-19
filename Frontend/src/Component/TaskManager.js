import { useContext } from "react";
import AppContext from "../Context/AppProvider";

function TaskManager() {
  const { newTask, taskInput, postTask } = useContext(AppContext);

  return (
    <form>
      <input type="text" value={newTask} onChange={(e) => taskInput(e)} />
      <button onClick={(e) => postTask(e)}>SUBMIT FORM</button>
    </form>
  );
}

export default TaskManager;

import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer from "./Reducer";

// create context instance declearation
const AppContext = createContext();

// function and variable initial states
const initialState = {
  complete: false,
  newTask: "",
  // errorMsg: "",
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch all task
  const [data, setData] = useState([]);
  const fetchTasks = async () => {
    await axios
      .get("http://localhost:1234/api/v1/tasks")
      .then((response) => setData(response.data.tasks))
      .catch((error) => console.error(error));
    // console.log(data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  // task input fields
  const taskInput = (e) => {
    dispatch({ type: "TASK_INPUT", payload: e });
    // console.log(e.target.value)
  };

  // post task
  const [error, setError] = useState("");
  const postTask = async (e) => {
    // e.preventDefault();
    const freshTask = {
      name: state.newTask,
      completed: false,
    };
    await axios
      .post("http://localhost:1234/api/v1/tasks", freshTask)
      .then((resp) => console.log(resp.data))
      .catch((errors) => setError(errors.response.data.msg));

    // window.location.reload(true);
    state.newTask = "";
  };

  // check box functionality
  const checkBoxFunc = (e) => {
    if (e.target.checked) {
      dispatch({ type: "CHECKBOX_ON", payload: e.target.checked });
      e.target.checked = false;
      console.log(e.target.checked, e);
    } else {
      dispatch({ type: "CHECKBOX_OFF", payload: e.target.unchecked });
      e.target.checked = true;
      console.log(e.target.unchecked, e);
    }
  };

  return (
    <AppContext.Provider
      value={{ ...state, checkBoxFunc, data, taskInput, postTask, error }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer from "./Reducer";
import { Navigate } from "react-router-dom";

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
  // const fetchTasks = async () => {
  //   await axios
  //     .get("http://localhost:1234/api/v1/tasks")
  //     .then((response) => setData(response.data.tasks))
  //     .catch((error) => console.error(error));
  //    console.log(data);
  // };
  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // Register new user

  // task input fields
  const taskInput = (e) => {
    dispatch({ type: "TASK_INPUT", payload: e });
    // console.log(e.target.value)
  };

  // post task
  const [usertasks, setUsertasks] = useState([]);

  const postTask = async (e) => {
    e.preventDefault();

    const tokenSaved = localStorage.getItem("token");
    const jsonData = JSON.parse(tokenSaved);
    const token = jsonData.token;

    const freshTask = {
      name: state.newTask,
    };
    await axios
      .post("http://localhost:1234/api/v1/tasks", freshTask, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => console.log(resp.data))
      .catch((errors) => setUsertasks(errors.response.data.msg));

    window.location.reload(true);
    state.usertasks = "";
  };

  // log out

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
    // return <Navigate to="/" />;
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
      value={{
        ...state,
        checkBoxFunc,
        data,
        taskInput,
        postTask,
        usertasks,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

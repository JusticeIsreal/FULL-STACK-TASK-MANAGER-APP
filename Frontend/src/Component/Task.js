import TaskManager from "./TaskManager";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AppContext from "../Context/AppProvider";
function Task() {
  // functions and variables from AppProvider
  const { logOut } = useContext(AppContext);

  // fetch user details
  const [person, setPerson] = useState();
  const [task, setTask] = useState();

  const fetchUser = async () => {
    const tokenSaved = localStorage.getItem("token");
    const jsonData = JSON.parse(tokenSaved);
    const token = jsonData.token;

    await axios
      .get("http://localhost:1234/api/v1/users/allUsers", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPerson(response.data.user);
        setTask(response.data.user.task);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    return () => {
      fetchUser();
    };
  }, []);
  return (
    <div className="client-page">
      <div className="client-page-user">
        <p>
          Hello <b>{person && person.name.toUpperCase()}</b>
        </p>
        <button onClick={logOut}>Log Out</button>
      </div>{" "}
      <>
        <TaskManager />
      </>
      <div className="client-page-content">
        <>
          {task ? (
            <h3>
              {task.map((item) => (
                <TaskDetails key={item._id} {...item} />
              ))}
            </h3>
          ):<h1 className="loading-text">Loading...</h1>}
        </>

        <div></div>
      </div>
    </div>
  );
}

function TaskDetails({ _id, name, completed, status }) {
  // const { checkBoxFunc, complete } = useContext(AppContext);
  const navigate = useNavigate();
  //  localhost:1234/api/v1/tasks/63c2cd3f4ba2a057caec7291

  // delete task
  const deleteTask = async (_id) => {
    const tokenSaved = localStorage.getItem("token");
    const jsonData = JSON.parse(tokenSaved);
    const token = jsonData.token;
    await axios
      .delete("http://localhost:1234/api/v1/tasks/" + `${_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((resp) => {
        window.location.reload();
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div className="client-tasks-main-con">
      <p
        style={
          status === "Open" ? { color: "#cc2e2e94" } : { color: "#0d62d89e" }
        }
        className="client-tasks-status"
      >
        {status}
      </p>
      {/* <input
        type="checkbox"
        checked={completed}
        readOnly
        className="client-tasks-completed-input"
      /> */}
      <p className="client-tasks-content">{name}</p>

      <BiEdit
        className="client-tasks-edit-btn"
        onClick={() => {
          navigate(`/taskDetails/${_id}`);
        }}
      />

      <RiDeleteBin6Line
        onClick={() => deleteTask(_id)}
        className="client-tasks-delete-btn"
      />
    </div>
  );
}

export default Task;

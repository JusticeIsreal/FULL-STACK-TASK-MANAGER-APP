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
      <div className="client-page-content">
        <div>
          <p>Hello </p> <h3>{person && person.name} !</h3>
        </div>
        <>
          <TaskManager />
        </>
        {task && (
          <h3>
            {task.map((item) => (
              <TaskDetails key={item._id} {...item} />
            ))}
          </h3>
        )}
        <div></div>
      </div>

      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

function TaskDetails({ _id, name, completed, status }) {
  // const { checkBoxFunc, complete } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <form style={{ display: "flex", alignItems: "center" }}>
          <p>{completed}</p>
          <input type="checkbox" checked={completed} readOnly />
          <p>{name} </p>

          <p style={{ color: "green" }}>{status}</p>

          <BiEdit
            onClick={() => {
              navigate(`/taskDetails/${_id}`);
            }}
          />

          <RiDeleteBin6Line />
        </form>
      </div>
    </div>
  );
}

export default Task;

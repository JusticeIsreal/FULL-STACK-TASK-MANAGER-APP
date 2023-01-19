import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function DynamicPage() {
  const [userinfo, setUserinfo] = useState("");
  const [updatetask, setUpdatetask] = useState("");
  const [updatestatus, setUpdatestatus] = useState("Open");
  const [updatecompleted, setUpdatecompleted] = useState(false);

  const { _id } = useParams();

  const tokenSaved = localStorage.getItem("token");
  const jsonData = JSON.parse(tokenSaved);
  const token = jsonData.token;

  const getsingleUser = async () => {
    await axios
      .get("http://localhost:1234/api/v1/tasks/" + `${_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((resp) => {
        console.log(resp.data.task);
        setUpdatetask(resp.data.task.name);
        setUpdatestatus(resp.data.task.status);
        setUpdatecompleted(resp.data.task.completed);
      })
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    getsingleUser();
  }, []);

  const singleUser = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        "http://localhost:1234/api/v1/tasks/" + `${_id}`,
        {
          name: updatetask,
          status: updatestatus,
          completed: updatecompleted,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      .then((resp) => {
        // console.log(resp.data);
        setUserinfo(resp.data);
        alert("Task has been updated successfully");
        setTimeout(() => {
          window.location.href = "/tasks";
        }, 1000);
      })
      .catch((err) => {
        throw err;
      });
  };

  // console.log(userinfo);
  console.log(updatecompleted);
  return (
    <div>
      <form onSubmit={(event) => singleUser(event)} className="login-page-form">
        {/* update task */}
        <div className="login-page-email-con">
          <label>Update Task</label>
          <input
            placeholder="Edit task"
            type="text"
            value={updatetask}
            name="task"
            onChange={({ target }) => setUpdatetask(target.value)}
          />
        </div>

        {/* update status */}
        <div className="login-page-email-con">
          <label>Update Status</label>
          <select
            value={updatestatus}
            onChange={({ target }) => setUpdatestatus(target.value)}
          >
            <option value="open" key="open">
              Open
            </option>
            <option value="close" key="close">
              Close
            </option>
          </select>
        </div>

        {/* update completed */}
        <div>
          <label>Completed ?</label>
          <input
            type="checkbox"
            readOnly
            checked={updatecompleted}
            value={updatecompleted}
            onChange={({ target }) => setUpdatecompleted(target.checked)}
          />
        </div>

        <div className="login-page-sunmit-btn-con">
          <button type="submit" className="login-page-submit-btn">
            log In
          </button>
        </div>

        <p className="login-page-register-btn">
          Have an account ?
          <Link to="/login">
            <span> Login</span>
          </Link>
        </p>
        <button onClick={(e) => singleUser(e)}>save</button>
      </form>
    </div>
  );
}

export default DynamicPage;

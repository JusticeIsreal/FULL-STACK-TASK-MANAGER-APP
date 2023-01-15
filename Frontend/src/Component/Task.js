import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/AppProvider";
function Task() {
  // functions and variables from AppProvider
  const { data } = useContext(AppContext);

  const [person, setPerson] = useState();

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
        console.log(response.data.user.note);
        setPerson(response.data.user);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    return () => {
      fetchUser();
    };
  }, []);
  return (
    <>
      <div>
        Welcome <h3>{person && person.name}</h3>{" "}
        <div>
          {person && (
            <div>
              {person.note.map((item) => (
                <div key={item._id}>{item.content}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.length > 1 ? (
        <div>
          {data.map((item) => (
            <TaskDetails key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

function TaskDetails({ _id, name, completed }) {
  const { checkBoxFunc, complete } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div>
        <form style={{ display: "flex", alignItems: "center" }}>
          <p>{name}</p>
          <input
            type="checkbox"
            value={complete}
            checked={completed}
            onChange={(e) => checkBoxFunc(e)}
          />

          <button
            onClick={() => {
              navigate(`/task/${_id}`);
            }}
          >
            edit
          </button>

          <button> delete</button>
        </form>
      </div>
    </div>
  );
}

export default Task;

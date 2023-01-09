import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppProvider";
function Task() {
  // functions and variables from AppProvider
  const { data } = useContext(AppContext);

  return (
    <>
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

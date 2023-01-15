import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [user, setUser] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:1234/api/v1/users/loginUser", {
        email: useremail,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "./tasks";
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={(event) => logIn(event)}>
        <div>
          email
          <input
            type="email"
            value={useremail}
            name="Username"
            onChange={({ target }) => setUseremail(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginForm() {
  const [errorMessage, setErrorMesssage] = useState("");
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
        setErrorMesssage(error.response.data.error);
        setTimeout(() => {
          setErrorMesssage("");
        }, 3000);
        throw error;
      });
  };

  return (
    <div className="login-page">
      <h1 className="login-page-logo">TM</h1>
      <div className="login-page-quote-con">
        <h3 className="login-page-quote">Login to your account</h3>
        <p className="login-page-txt">{errorMessage}</p>
      </div>

      <form onSubmit={(event) => logIn(event)} className="login-page-form">
        <div className="login-page-email-con">
          <label>Email</label>
          <input
            placeholder="John@gmail.com"
            type="email"
            value={useremail}
            name="Username"
            onChange={({ target }) => setUseremail(target.value)}
          />
        </div>
        <div className="login-page-password-con">
          <label>Password</label>
          <input
            placeholder="**********"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <p className="login-page-forgot-password-txt">Forgot Password</p>
        <div className="login-page-sunmit-btn-con">
          <button type="submit" className="login-page-submit-btn">
            log In
          </button>
        </div>

        <p className="login-page-register-btn">
          Don't have an account ?
          <Link to="/register">
            <span> Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

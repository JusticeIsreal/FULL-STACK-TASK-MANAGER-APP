import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [errorMessage, setErrorMesssage] = useState("");
  const [newusername, setNewusername] = useState("");
  const [newuseremail, setNewuseremail] = useState("");
  const [newuserpassword, setNewuserassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const logIn = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:1234/api/v1/users/addUser", {
        name: newusername,
        email: newuseremail,
        password: newuserpassword,
      })
      .then((response) => {
        alert("Your acount has been created successfully");
        console.log(response.data);
        setTimeout(() => {
          window.location.href = "./login";
        }, 1000);
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
        <h3 className="login-page-quote">Create an account</h3>
        <p className="login-page-txt">{errorMessage}</p>
      </div>

      <form onSubmit={(event) => logIn(event)} className="login-page-form">
        <div className="login-page-email-con">
          <label>Username</label>
          <input
            placeholder="John Doe"
            type="text"
            value={newusername}
            name="Username"
            onChange={({ target }) => setNewusername(target.value)}
          />
        </div>
        <div className="login-page-email-con">
          <label>Email</label>
          <input
            placeholder="John@gmail.com"
            type="email"
            value={newuseremail}
            name="newuseremail"
            onChange={({ target }) => setNewuseremail(target.value)}
          />
        </div>
        <div className="login-page-password-con">
          <label>Password</label>
          <input
            placeholder="**********"
            type="password"
            value={newuserpassword}
            name="Password"
            onChange={({ target }) => setNewuserassword(target.value)}
          />
        </div>
        <div className="login-page-password-con">
          <label>Confirm Password</label>
          <input
            placeholder="**********"
            type="password"
            value={cpassword}
            name="Password"
            onChange={({ target }) => setCpassword(target.value)}
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
      </form>
    </div>
  );
}

export default Register;

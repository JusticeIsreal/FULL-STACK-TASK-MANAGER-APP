import React from "react";
import { Link } from "react-router-dom";


function StartingPage() {
  return (
    <div className="starting-page">
      <div className="starting-page-logo-container">
        <h1 className="starting-page-logo">TM</h1>
      </div>

      <div className="starting-page-quote-container">
        <h2 className="starting-page-quote">
          Task Management Is Time Management.
        </h2>
        <em className="starting-page-txt-container">
          Task by task, progress is made.Check off your list and then be free
        </em>
      </div>

      <div className="starting-page-bttn-container">
        <Link to="/register" className="starting-page-create-acc-container">
          <button>Create an Account</button>
        </Link>
        <Link to="/login" className="starting-page-login-container">
          <button>Login</button>
        </Link>{" "}
      </div>
    </div>
  );
}

export default StartingPage;

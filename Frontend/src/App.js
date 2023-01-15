import { useState } from "react";
import LoginForm from "./Component/LoginForm";
import DynamicPage from "./Pages/DynamicPage";
import TaskManagerProject from "./Pages/TaskManagerProject";
import RequireAuth from "./Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route
            exact
            path="/tasks"
            element={
              <RequireAuth>
                <TaskManagerProject />
              </RequireAuth>
            }
          />
          <Route path="/edit/:_id" element={ <DynamicPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

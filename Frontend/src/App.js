import StartingPage from "./Pages/StartingPage";
import LoginForm from "./Component/LoginForm";
import Register from "./Component/Register";
import DynamicPage from "./Pages/DynamicPage";
import TaskManagerProject from "./Pages/TaskManagerProject";
import RequireAuth from "./Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./Styles/Styles.css";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<StartingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route
            exact
            path="/tasks"
            element={
              <RequireAuth>
                <TaskManagerProject />
              </RequireAuth>
            }
          />
          <Route path="/edit/:_id" element={<DynamicPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

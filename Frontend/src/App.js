import DynamicPage from "./Pages/DynamicPage";
import TaskManagerProject from "./Pages/TaskManagerProject";
// import DynamicPage from "./Pages/DynamicPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<TaskManagerProject />} />
          <Route path="/edit/:_id" element={<DynamicPage />} />
        </Routes>
      </Router>
      {/* <TaskManagerProject /> */}
    </div>
  );
}

export default App;

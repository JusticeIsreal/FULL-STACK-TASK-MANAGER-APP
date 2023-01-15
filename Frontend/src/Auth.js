import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
//   const jsonData = JSON.parse(token);
//   const to = jsonData.token;
//   console.log(to);
  if (token) {
    return children;
  }
  return <Navigate to="/" />;
};

export default RequireAuth;

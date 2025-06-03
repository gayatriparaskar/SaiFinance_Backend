import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  if (user?.role?.toLowerCase() === "admin") {
    return children;
  }
  return <Navigate to="/" />;
};  
export default AdminRoute
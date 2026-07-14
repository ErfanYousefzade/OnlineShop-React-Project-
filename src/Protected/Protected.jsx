import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const token = localStorage.getItem("token");
  const expireTime = localStorage.getItem("expireTime");

  if (!token || !expireTime) {
    return <Navigate to="/Admin" replace />;
  }

  if (Date.now() > Number(expireTime)) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");

    return <Navigate to="/Admin" replace />;
  }

  return children;
}
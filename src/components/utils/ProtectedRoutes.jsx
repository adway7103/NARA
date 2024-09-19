import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setAuthStatus } from "../../store";
import PageLoader from "./PageLoader";

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(setAuthStatus({ isAuthenticated: true, accessToken: token }));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);
  

  if (isAuthenticated === null) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

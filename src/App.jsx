import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { setAuthStatus } from "./store";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      dispatch(setAuthStatus({ accessToken, isAuthenticated: true }));
  }, []);
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Outlet />
    </div>
  );
}
export default App;

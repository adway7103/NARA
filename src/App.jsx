import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Outlet />
    </>
  );
}

export default App;

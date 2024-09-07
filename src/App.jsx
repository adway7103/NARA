import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Outlet />
    </div>
  );
}
export default App;

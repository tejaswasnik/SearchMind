import { RouterProvider } from "react-router";
import { routes } from "../app/app.routes.jsx";
import { useAuth } from "../features/auth/hook/useAuth.js";
import { useEffect } from "react";
function App() {
  const auth = useAuth();
  useEffect(() => {
    auth.handleGetMe();
  }, []);
  return <RouterProvider router={routes} />;
}

export default App;

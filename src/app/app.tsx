import Home from "../pages/home";
import { ROUTES } from "../shared/constants/routes";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

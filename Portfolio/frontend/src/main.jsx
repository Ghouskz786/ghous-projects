import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UpdateElement from "./components/UpdateElement.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProjectElement from "./components/AddProjectElement.jsx";

const route = createBrowserRouter([
  { path: "/", element: <App></App> },
  { path: "/update-portfolio", element: <UpdateElement /> },
  { path: "/update-portfolio/add-project", element: <AddProjectElement /> },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={route}>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </RouterProvider>,
);

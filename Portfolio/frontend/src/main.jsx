import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UpdateElement from "./components/UpdateElement.jsx";
import App, { HydrateFallback } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProjectElement from "./components/AddProjectElement.jsx";
const handleLoader = async () => {
  const res = await (
    await fetch("https://ghous-projects.vercel.app/project/get-project", {
      method: "get",
      credentials: "include",
    })
  ).json();
  if (res.success) {
    return { success: true, projects: res.projects };
  } else {
    return { success: false, Errors: res.messages };
  }
  };
const route = createBrowserRouter([
  { path: "/", element: <App></App>,    loader: handleLoader,
    hydrateFallbackElement: <HydrateFallback /> },
  { path: "/update-portfolio", element: <UpdateElement /> },
  { path: "/update-portfolio/add-project", element: <AddProjectElement /> },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={route}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>,
);



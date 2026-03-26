import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import NotFoundPage from "./components/NotFoundPage.js";
import VerificationComponent from "./components/VerificationComponent.jsx";
import ReactStore from "./store/ReactStore.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreatePost from "./components/CreatePost.jsx";
import Stats from "./components/Stats.jsx";
import Reel from "./components/Reel.jsx";
import OrderElement from "./components/OrderElement.jsx";
import FoodItem from "./components/FoodItem.jsx";
import AllFoodItems from "./components/AllFoodItems.jsx";
import CreateFoodItems from "./components/CreateFoodItems.jsx";
import Resturant from "./components/Resturant.jsx";
import CartElement from "./components/CartElement.jsx";
import ChatElement from "./components/ChatElement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [{ path: "/cart", element: <CartElement /> }],
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signup", element: <SignUp /> },

  { path: "/auth/verification", element: <VerificationComponent /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/posts", element: <Stats /> },
      { path: "/dashboard/create-post", element: <CreatePost /> },
    ],
  },
  { path: "/resturant/:resturantName", element: <Resturant /> },
  {
    path: "/food-dashboard",
    element: <FoodItem />,
    children: [
      {
        path: "/food-dashboard/food-items/",
        element: <AllFoodItems />,
      },
      {
        path: "/food-dashboard/create-food-items",
        element: <CreateFoodItems />,
      },
    ],
  },

  { path: "/orders", element: <OrderElement /> },
  { path: "/chat/:chatId", element: <ChatElement /> },
  { path: "/*", element: <NotFoundPage /> },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ReactStore>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </ReactStore>,
  // </StrictMode>,
);

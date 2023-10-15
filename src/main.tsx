import ReactDOM from "react-dom/client";
import HomeScreen from "./screen/HomeScreen.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/normalize.css";
import "./assets/css/fonts.css";
import "./assets/css/index.css";
import NotFoundScreen from "./screen/NotFoundScreen.tsx";
import RegisterScreen from "./screen/RegisterScreen.tsx";
import ChatScreen from "./screen/ChatScreen.tsx";
import LogoutScreen from "./screen/LogoutScreen.tsx";
import LoginScreen from "./screen/LoginScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  { path: "/login", element: <LoginScreen /> },
  {
    path: "/chat",
    element: <ChatScreen />,
  },
  {
    path: "/logout",
    element: <LogoutScreen />,
  },
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

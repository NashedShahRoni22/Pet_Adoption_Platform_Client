import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoute from "./PrivateRoute";
import AddPost from "../pages/addPost/AddPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addPost",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

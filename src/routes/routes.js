import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoute from "./PrivateRoute";
import AddPost from "../pages/addPost/AddPost";
import PetDetails from "../components/PetDetails";
import UserReviews from "../pages/UserReviews/UserReviews";

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
        path: "/petdetails/:id",
        element: <PetDetails />,
        loader: ({params}) => fetch(`http://localhost:5000/pets/${params.id}`)
      },
      {
        path: "/addPost",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/myReviews",
        element: (
          <PrivateRoute>
            <UserReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

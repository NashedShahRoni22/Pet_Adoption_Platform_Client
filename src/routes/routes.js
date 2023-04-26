import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children: ([
            {
                path:'/',
                element:<Home/>,
            },
            {
                path:'/login',
                element:<Login/>,
            }
        ])
    }
]) 
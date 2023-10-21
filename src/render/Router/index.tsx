import {createHashRouter} from "react-router-dom";
import Layout from "@/Layout/index";
import Home from "@/Pages/Home";
import ErrorPage from "@/Pages/ErrorPage";

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    },
]);


import {createHashRouter} from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                path: "home",
                element: <Home/>
            }
        ]
    },
]);

import {createHashRouter, RouteObject} from "react-router-dom";
import Layout from "@/Layout/index";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";

export const RootRouterChildren: Array<RouteObject & { name: string}> = [
    {
        path: "/",
        index: true,
        element: <Home/>,
        name: "主页",
    },
]

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: RootRouterChildren
    },
]);


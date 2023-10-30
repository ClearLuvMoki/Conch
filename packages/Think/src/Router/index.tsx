import React from "react";
import {createHashRouter, RouteObject} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {IconBaseProps} from "react-icons/lib/cjs/iconBase";
import Home from "@/src/Pages/Home";
import Layout from "@/src/Layout";
import ErrorPage from "@/src/Pages/ErrorPage";

const IconConfig: IconBaseProps = {
    size: 20
}

export const RootRouterChildren: Array<RouteObject & { name: string, icon: React.ReactNode }> = [
    {
        path: "/",
        index: true,
        element: <Home/>,
        name: "主页",
        icon: <AiOutlineHome {...IconConfig}/>
    }
]

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: RootRouterChildren
    },
]);


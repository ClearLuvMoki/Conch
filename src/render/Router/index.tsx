import {createHashRouter, redirect, RouteObject} from "react-router-dom";
import Layout from "@/Layout/index";
import ErrorPage from "@/Pages/ErrorPage";
import Login from "@/Pages/Login";
import {getStore} from "@/Utils/tools";
import {LocalStorageKeys} from "@/src/common/LocalStorageKeys";
import {AiOutlineEdit, AiOutlineHome} from "react-icons/ai";
import {IconBaseProps} from "react-icons/lib/cjs/iconBase";
import Think from "@/Pages/Think";
import Home from "@/Pages/Home";

const IconConfig: IconBaseProps = {
    size: 20
}

export const RootRouterChildren: Array<RouteObject & { name: string, icon: React.ReactNode }> = [
    {
        path: "/",
        element: <Home/>,
        name: "主页",
        icon: <AiOutlineHome {...IconConfig}/>
    },
    {
        path: "/think",
        index: true,
        element: <Think/>,
        name: "知识库",
        icon: <AiOutlineEdit {...IconConfig}/>
    }
]

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            const user = getStore(LocalStorageKeys.user.info);
            if (!user) {
                return redirect("/login");
            }
            return null;
        },
        children: RootRouterChildren
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
]);


import {createHashRouter, redirect, RouteObject} from "react-router-dom";
import Layout from "@/Layout/index";
import ErrorPage from "@/Pages/ErrorPage";
import Login from "@/Pages/Login";
import {AiOutlineEdit, AiOutlineHome} from "react-icons/ai";
import {IconBaseProps} from "react-icons/lib/cjs/iconBase";
import Think from "@/Pages/Think";
import Home from "@/Pages/Home";
import {UserStore} from "@/Stores/User";

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
    },
    {
        path: "/think",
        element: <Think/>,
        name: "知识库",
        icon: <AiOutlineEdit {...IconConfig}/>,
    }
]

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            const user = UserStore.getUserInfo()
            if (!user?.id) {
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


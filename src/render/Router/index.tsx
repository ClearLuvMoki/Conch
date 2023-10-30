import {createHashRouter, redirect, RouteObject} from "react-router-dom";
import Layout from "@/Layout/index";
import Home from "@/Pages/Home";
import ErrorPage from "@/Pages/ErrorPage";
import Login from "@/Pages/Login";
import {getStore} from "@/Utils/tools";
import {LocalStorageKeys} from "@/src/common/LocalStorageKeys";
import {AiOutlineHome} from "react-icons/ai";
import {IconBaseProps} from "react-icons/lib/cjs/iconBase";

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


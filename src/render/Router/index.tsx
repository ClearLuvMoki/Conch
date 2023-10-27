import {createHashRouter, redirect} from "react-router-dom";
import Layout from "@/Layout/index";
import Home from "@/Pages/Home";
import ErrorPage from "@/Pages/ErrorPage";
import Login from "@/Pages/Login";
import {getStore} from "@/Utils/tools";

export const handleLoginAction = async ({request}) => {
    console.log(request, 'request')
    // const userInfo = getStore("user-info");
    // return !userInfo?.id &&
}

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            const user = getStore("user-info");
            if (!user) {
                return redirect("/login");
            }
            return null;
        },
        children: [
            {
                path: "/",
                index: true,
                element: <Home/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
]);


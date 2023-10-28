import "./main.css"
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {Toaster} from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <NextUIProvider className={"w-full h-full overflow-hidden"}>
        <Toaster/>
        <RouterProvider router={router}/>
    </NextUIProvider>
)
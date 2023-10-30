import "./main.css"
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import {RouterProvider} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import {router} from "@/src/Router";
import {Provider} from 'mobx-react';
import Stores from "@/src/Stores";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={Stores}>
        <NextUIProvider className={"w-full h-full overflow-hidden"}>
            <Toaster/>
            <RouterProvider router={router}/>
        </NextUIProvider>
    </Provider>
)

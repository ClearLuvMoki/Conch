import "./main.css"
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {Toaster} from 'react-hot-toast';
import {Provider} from "mobx-react";
import Stores from "@/Stores/index";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={Stores}>
        <NextUIProvider className={"w-full h-full overflow-hidden"}>
            <Toaster/>
            <RouterProvider router={router}/>
        </NextUIProvider>
    </Provider>
)

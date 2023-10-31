import Sidebar from "./components/Sidebar";
import {Outlet} from "react-router-dom";
import {SidebarWidth} from "@/src/constant/ui";
import {useLayoutEffect} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {logger} from "@/Utils/logger";
import {UserStore} from "@/Stores/User";
import CommonComponents from "@/Layout/components/CommonComponents";

const Layout = () => {
    useLayoutEffect(() => {
        handleInitIpc()
        UserStore.initUserData();
    }, [])

    const handleInitIpc = () => {
        InjectEnv.ipcOn(IpcChannels.debug.send_logger_to_render, (_, params) => {
            logger.error(params)
        })
    }


    return (
        <div className={"w-full h-full overflow-hidden bg-[#fff] flex"}>
            <Sidebar/>
            <CommonComponents/>
            <div
                className={"overflow-hidden h-full"}
                style={{
                    width: `calc(100% - ${SidebarWidth}px)`
                }}
            >
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

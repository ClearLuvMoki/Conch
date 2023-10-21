import Sidebar from "./components/Sidebar";
import {Outlet} from "react-router-dom";
import {SidebarWidth} from "@/src/constant/ui";
import {useLayoutEffect} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {logger} from "@/Utils/logger";

const Layout = () => {
    useLayoutEffect(() => {
        handleInitIpc()
    }, [])

    const handleInitIpc = () => {
        InjectEnv.ipcOn(IpcChannels.debug.send_logger_to_render, (_, params) => {
            logger.info(params)
        })
    }


    return (
        <div className={"w-full h-full overflow-hidden bg-[#fff] flex"}>
            <Sidebar/>
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

import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {logger} from "@/Utils/logger";
import CommonComponents from "@/Layout/components/CommonComponents";

const Layout = () => {

    useEffect(() => {
        handleInitIpc()
    }, [])


    const handleInitIpc = () => {
        InjectEnv?.ipcOn(IpcChannels.debug.send_logger_to_render, (_, params) => {
            logger.error(params)
        })
    }


    return (
        <div className={"w-full h-full overflow-hidden bg-[#fff] flex rounded-lg"} style={{pointerEvents: "auto"}}>
            <CommonComponents/>
            {/*<div*/}
            {/*    className={"overflow-hidden h-full w-full"}*/}
            {/*>*/}
            {/*    <Outlet/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Layout;

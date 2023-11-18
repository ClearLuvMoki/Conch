import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {logger} from "@/Utils/logger";
import {UserStore} from "@/Stores/User";
import CommonComponents from "@/Layout/components/CommonComponents";
import {useEvent} from "react-use";

const Layout = () => {
    useEffect(() => {
        // handleInitIpc()
        // UserStore.initUserData();


        return () => {
            window.removeEventListener("DOMContentLoaded", handleIsNeedIgnoreMouseEvents)
        }
    }, [])

     window.addEventListener("DOMContentLoaded", () => {
            console.log(1212)
        });

    const handleIsNeedIgnoreMouseEvents = () => {
        const el = document.getElementById('root')
        el.addEventListener('mouseenter', () => {
            InjectEnv.ipcSend(IpcChannels.os.is_need_ignore_mouse_events, true, {forward: true})
        })
        el.addEventListener('mouseleave', () => {
            InjectEnv.ipcSend(IpcChannels.os.is_need_ignore_mouse_events, false)
        })
    }

    useEvent("DOMContentLoaded", () => {
        console.log(12)
    })

    const handleInitIpc = () => {
        InjectEnv?.ipcOn(IpcChannels.debug.send_logger_to_render, (_, params) => {
            logger.error(params)
        })
    }


    return (
        <div className={"w-[100px] h-[100px] overflow-hidden bg-[#fff] flex"} style={{pointerEvents: "auto"}}>
            <CommonComponents/>
            <div>233</div>
            <div
                className={"overflow-hidden h-full w-full"}
            >
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

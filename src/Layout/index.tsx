import React from "react";
import Sidebar from "./components/Sidebar";
import {Outlet} from "react-router-dom";
import {SidebarWidth} from "../../constant/ui.tsx";

const Layout = () => {
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

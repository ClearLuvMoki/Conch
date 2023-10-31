import {Outlet} from "react-router-dom";
import {SidebarHeight} from "@/Constant/ui";
import Sidebar from "./components/Siderbar";

const Layout = () => {
    return (
        <div className={"w-full h-full overflow-hidden bg-[#fff] p-4"}>
            <Sidebar/>
            <div
                className={"overflow-hidden h-full"}
                style={{
                    height: `calc(100% - ${SidebarHeight}px)`
                }}
            >
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

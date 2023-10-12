import React from "react";
import {Button} from "@nextui-org/react";
import {SidebarWidth} from "../../../../constant/ui.tsx";
import {useNavigate} from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{width: SidebarWidth}}
            className={"h-full bg-PrimaryBackground flex flex-col justify-center items-center"}
            data-tauri-drag-region
        >
            <Button
                color="primary"
                isIconOnly
                onClick={() => {
                    navigate("/home", {replace: true})
                }}
                className={"text-[#fff]"}
            >
                Ho
            </Button>
        </div>
    );
};

export default Sidebar;

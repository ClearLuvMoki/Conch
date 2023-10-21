// @ts-nocheck
import {Button} from "@nextui-org/react";
import {SidebarWidth} from "@/src/constant/ui";
import {useNavigate} from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{width: SidebarWidth, appRegion: 'drag'}}
            className={"h-full bg-PrimaryBackground flex flex-col justify-center items-center"}
        >
            <Button
                style={{appRegion: 'no-drag'}}
                color="primary"
                isIconOnly
                onClick={() => {
                    navigate("/", {replace: true})
                }}
                className={"text-[#fff]"}
            >
                Ho
            </Button>
        </div>
    );
};

export default Sidebar;

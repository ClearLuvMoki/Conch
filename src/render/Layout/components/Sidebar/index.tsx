// @ts-nocheck
import {Button} from "@nextui-org/react";
import {SidebarWidth} from "@/src/constant/ui";
import {useNavigate} from "react-router-dom"

const Sidebar = () => {
        const navigate = useNavigate();
        return (
            <div
                style={{
                    width: SidebarWidth
                }}
                className={"h-full bg-PrimaryBackground flex flex-col justify-center items-center drag-window"}
            >
                < Button
                    color="primary"
                    isIconOnly
                    onClick={() => {
                        navigate("/", {replace: true})
                    }}
                    className={"text-[#fff] no-drag-window"}
                >
                    Ho
                </Button>
                <Button
                    color="primary"
                    isIconOnly
                    onClick={() => {
                        navigate("/login", {replace: true})
                    }}
                    className={"text-[#fff] no-drag-window"}
                >
                    LO
                </Button>
            </div>
        )
            ;
    }
;

export default Sidebar;

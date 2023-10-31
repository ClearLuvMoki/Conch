import React from "react";
import {Button, Spacer} from "@nextui-org/react";
import {SidebarWidth} from "@/src/constant/ui";
import {useNavigate} from "react-router-dom"
import {RootRouterChildren} from "@/Router/index";

const Sidebar = () => {
        const navigate = useNavigate();
        return (
            <div
                style={{
                    width: SidebarWidth
                }}
                className={"h-full bg-PrimaryBackground flex flex-col justify-center items-center drag-window"}
            >
                {
                    RootRouterChildren.map(menu => (
                        <React.Fragment key={menu.path}>
                            < Button
                                color="primary"
                                variant={"shadow"}
                                isIconOnly
                                key={menu.path}
                                onClick={() => {
                                    navigate(menu.path, {replace: true})
                                }}
                                className={"text-white no-drag-window"}
                            >
                                {menu.icon}
                            </Button>
                            <Spacer y={4}/>
                        </React.Fragment>
                    ))
                }
            </div>
        )
            ;
    }
;

export default Sidebar;

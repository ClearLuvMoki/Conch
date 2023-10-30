import {SidebarHeight} from "@/Constant/ui";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spacer} from "@nextui-org/react";

const Sidebar = () => {
    return (
        <div
            className={"w-full flex  justify-end px-4 items-center"}
            style={{height: SidebarHeight}}
        >
            <Button
                color={"primary"}
                variant={"shadow"}
            >
                主页
            </Button>
            <Spacer x={4}/>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        color={"primary"}
                        variant={"shadow"}
                    >
                        最近
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" color={"primary"}>
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Spacer x={4}/>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        color={"primary"}
                        variant={"shadow"}
                    >
                        知识库
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" color={"primary"}>
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default Sidebar;

import {Button, Spacer, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu} from "@nextui-org/react";
import {WikiStore} from "@/Stores/WIki";

const ThinkLayout = () => {

    const handleWikiActions = (keys: string) => {
        switch (keys) {
            case "create-wiki":
                return WikiStore.updateWikiModalState({isOpen: true})
        }
    }


    return (
        <div className={"w-full px-4 flex justify-end"}>
            <Button
                color="primary"
                variant={"shadow"}
            >
                主页
            </Button>
            <Spacer x={4}/>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        color="primary"
                        variant={"shadow"}
                    >
                        最近
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
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
                        color="primary"
                        variant={"shadow"}
                    >
                        知识库
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    onAction={handleWikiActions}
                >
                    <DropdownItem key="create-wiki">创建知识库</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default ThinkLayout;

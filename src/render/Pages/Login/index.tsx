import Icon from "@/resources/desktop-icon.png"
import {Button, Image, Input, Divider} from "@nextui-org/react";


const Login = () => {
    return (
        <div
            className={"w-full h-full overflow-hidden bg-[#fff] drag-window flex items-center justify-center"}
        >
            <div className={"no-drag-window flex flex-col justify-center items-center gap-2 select-none w-[300px]"}>
                <div className={"flex gap-2 items-center w-full"}>
                    <Image
                        width={120}
                        src={Icon}
                    />
                    <div className={"text-5xl font-semibold"}>Conch</div>
                </div>
                <div className={"w-full flex flex-col items-center gap-2"}>
                    <Input
                        label="昵称"
                        size={"sm"}
                    />
                    <Input
                        label="密码"
                        size={"sm"}
                    />
                </div>
                <div className={"flex gap-1 mt-3 w-full"}>
                    <Button className={"w-1/2"} fullWidth={true} variant="shadow">重置</Button>
                    <Button
                        className={"w-1/2 text-white"}
                        fullWidth={true}
                        variant="shadow"
                        color="primary"
                    >
                        登录
                    </Button>
                </div>
                <Divider className={"my-2"}/>
                <div className={"text-NoteTextColor text-sm"}>@copyright ClearLuvMoki</div>
            </div>
        </div>
    );
};

export default Login;

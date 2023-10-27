import Icon from "@/resources/desktop-icon.png"
import {Button, Divider, Image, Input} from "@nextui-org/react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import toast from "react-hot-toast";
import {useState} from "react";

interface State {
    loading: boolean;
    nickName: string;
    password: string;
}

const Login = () => {
    const [state, setState] = useState<State>({
        loading: false,
        nickName: "",
        password: ""
    })


    const handleLogin = () => {
        setState((prevState) => ({...prevState, loading: true}))
        InjectEnv.invoke(IpcChannels.user.add_user, {nickName: state.nickName, password: state.password})
            .then((res: IpcResults<any, string>) => {
                if (res.code === IpcResultsCode.error) {
                    toast.error(res.errMsg)
                } else {
                    toast.success("登录成功!")
                }
            })
            .finally(() => {
                setState((prevState) => ({...prevState, loading: false}))
            })
    };

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
                        onChange={(event) => {
                            setState((prevState) => ({...prevState, nickName: event.target.value}))
                        }}
                    />
                    <Input
                        label="密码"
                        size={"sm"}
                        type={"password"}
                        onChange={(event) => {
                            setState((prevState) => ({...prevState, password: event.target.value}))
                        }}
                    />
                </div>
                <div className={"flex gap-1 mt-3 w-full"}>
                    <Button
                        className={"w-1/2"}
                        fullWidth={true}
                        variant="shadow"
                        onPress={() => {
                            setState((prevState) => ({...prevState, nickName: "", password: ""}))
                        }}
                    >重置</Button>
                    <Button
                        className={"w-1/2 text-white"}
                        fullWidth={true}
                        variant="shadow"
                        color="primary"
                        onPress={() => {
                            handleLogin()
                        }}
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

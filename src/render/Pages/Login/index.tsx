import Icon from "@/resources/desktop-icon.png"
import {Button, Divider, Image, Input} from "@nextui-org/react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import toast from "react-hot-toast";
import {useState} from "react";
import Avatar, {genConfig} from 'react-nice-avatar'
import {BiEdit} from "react-icons/bi";
import {motion} from "framer-motion";

interface State {
    loading: boolean;
    nickName: string;
    password: string;
}

const AvatarConfig = [
    {label: "sex", options: [{label: "man", value: "man"}, {label: "woman", value: "woman"}]}
]

const Login = () => {
    const [state, setState] = useState<State>({
        loading: false,
        nickName: "",
        password: ""
    })

    const [avatarConfigState, setAvatarConfigState] = useState({
        isEdit: false
    })


    const config = {
        "sex": "man",
        "faceColor": "#F9C9B6",
        "earSize": "small",
        "eyeStyle": "oval",
        "noseStyle": "long",
        "mouthStyle": "smile",
        "shirtStyle": "short",
        "glassesStyle": "square",
        "hairColor": "#000",
        "hairStyle": "thick",
        "hatStyle": "turban",
        "hatColor": "#fff",
        "eyeBrowStyle": "up",
        "shirtColor": "#9287FF",
        "bgColor": "#6BD9E9"
    }

    const myConfig = genConfig({
        // s
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
                <motion.div className={"flex gap-2 items-center w-full"} layout>
                    <Image
                        width={120}
                        src={Icon}
                    />
                    <div className={"text-5xl font-semibold"}>Conch</div>
                </motion.div>
                <div className={"w-full flex flex-col items-center gap-2"}>
                    <motion.div className={"w-full  mb-8 flex flex-col items-center"} layout>
                        <motion.div className={"w-20 h-20 relative"} layout>
                            <Avatar className="w-20 h-20" {...myConfig} id={"aaa"}/>
                            <Button
                                className={"absolute -right-3 -bottom-1 text-white"}
                                isIconOnly
                                variant={"shadow"}
                                size={"sm"}
                                radius={"full"}
                                color="primary"
                                onPress={() => {
                                    setAvatarConfigState((prevState) => ({...prevState, isEdit: !prevState.isEdit}))
                                }}
                            >
                                <BiEdit/>
                            </Button>
                        </motion.div>
                        {
                            avatarConfigState.isEdit && (
                                <motion.div
                                    layout
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    className={"bg-PrimaryBlack rounded-large p-2 flex flex-nowrap"}
                                >
                                    12
                                </motion.div>
                            )
                        }
                    </motion.div>
                    <Input
                        label="昵称"
                        size={"sm"}
                        value={state.nickName}
                        onValueChange={(event) => {
                            setState((prevState) => ({...prevState, nickName: event}))
                        }}
                    />
                    <Input
                        label="密码"
                        size={"sm"}
                        type={"password"}
                        value={state.password}
                        onValueChange={(event) => {
                            setState((prevState) => ({...prevState, password: event}))
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
                <div className={"text-NoteTextColor text-sm"}>@Copyright ClearLuvMoki</div>
            </div>
        </div>
    );
};

export default Login;

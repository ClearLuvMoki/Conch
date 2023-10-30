import {motion} from 'framer-motion';
import {Button, Input} from "@nextui-org/react";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useContext} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import toast from "react-hot-toast";
import {handleLogin, LoginFormContext} from "@/Pages/Login";
import {UserTypes} from "@/types/user";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const {state, setState} = useContext(LoginFormContext);
    const navigator = useNavigate();

    const handleClickSubmit = () => {
        setState({
            ...state,
            loading: true
        })
        InjectEnv.invoke(IpcChannels.user.add_user, {
            nickName: state.loginFormData.nickName,
            password: state.loginFormData.password
        })
            .then((res: IpcResults<UserTypes, string>) => {
                if (res.code === IpcResultsCode.error) {
                    toast.error(res.errMsg)
                } else {
                    toast.success("登录成功!")
                    handleLogin(res.data, () => {
                        navigator("/", {replace: true})
                    })

                }
            })
            .finally(() => {
                setState({
                    ...state,
                    loading: false
                })
            })
    };


    return (
        <motion.div
            id={"LoginForm"}
            initial={{opacity: 0, x: 10}}
            animate={{opacity: 1, x: 0}}
            className={"w-full flex flex-col items-center gap-2"}
        >
            <div className={"w-full flex flex-col items-center gap-2"}>
                <Input
                    label="昵称"
                    size={"sm"}
                    value={state.loginFormData.nickName}
                    onValueChange={(value) => {
                        setState({
                            ...state,
                            loginFormData: {
                                ...state.loginFormData,
                                nickName: value
                            }
                        })
                    }}
                />
                <Input
                    label="密码"
                    size={"sm"}
                    type={"password"}
                    value={state.loginFormData.password}
                    onValueChange={(value) => {
                        setState({
                            ...state,
                            loginFormData: {
                                ...state.loginFormData,
                                password: value
                            }
                        })
                    }}
                />
            </div>
            <div className={"flex gap-1 mt-3 w-full"}>
                <Button
                    className={"w-1/2"}
                    fullWidth={true}
                    variant="shadow"
                    onPress={() => {
                        setState({
                            ...state,
                            loginFormData: {
                                nickName: "",
                                password: ""
                            }
                        })
                    }}
                >
                    重置
                </Button>
                <Button
                    className={"w-1/2"}
                    fullWidth={true}
                    variant="shadow"
                    color="primary"
                    onPress={() => {
                        handleClickSubmit()
                    }}
                >
                    注册
                </Button>
            </div>
            <div className={"w-full flex justify-end"}>
                <Button
                    color="primary"
                    variant="light"
                    size={"sm"}
                    onPress={() => {
                        setState({
                            ...state,
                            loginStatus: "LoginAccounts"
                        })
                    }}
                >
                    <span>登录过的账号</span>
                    <span><AiOutlineArrowRight/></span>
                </Button>
            </div>
        </motion.div>
    );
};

export default LoginForm;

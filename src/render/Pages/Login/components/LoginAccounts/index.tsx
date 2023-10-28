import {motion} from 'framer-motion';
import {Button, Card, CardBody} from "@nextui-org/react";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useContext, useEffect} from "react";
import {LoginFormContext} from "@/Pages/Login";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResultsCode} from "@/types/ipc";
import {Avatar, AvatarGroup, User} from "@nextui-org/react";
import dayjs from "dayjs";

const LoginAccounts = () => {
    const {state, setState} = useContext(LoginFormContext);

    useEffect(() => {
        InjectEnv.invoke(IpcChannels.user.find_all_user)
            .then((res) => {
                if (res.code === IpcResultsCode.success) {
                    setState({
                        ...state,
                        loginAccounts: res.data
                    })
                }
            })
    }, [])

    return (
        <motion.div
            id={"LoginAccounts"}
            initial={{opacity: 0, x: 10}}
            animate={{opacity: 1, x: 0}}
            className={"w-full flex flex-col items-center gap-2"}
        >
            {
                state.loginAccounts?.length > 0 ? (
                    <div>
                        {
                            state.loginAccounts?.length > 0 && (
                                <Card className={"mb-4 cursor-pointer"}>
                                    <CardBody>
                                        <User
                                            name={state.loginAccounts[0].nickName}
                                            isFocusable={true}
                                            description={(
                                                <span>CreateTime: {dayjs(state.loginAccounts[0].createTime ?? "").format("YYYY.MM.DD HH:mm")}</span>
                                            )}
                                        />
                                    </CardBody>
                                </Card>
                            )
                        }
                        <AvatarGroup isBordered>
                            {
                                state.loginAccounts.map(avatar => (
                                    <Avatar name={avatar.nickName} key={avatar.id}/>
                                ))
                            }
                        </AvatarGroup>
                    </div>
                ) : (
                    <div>
                        <span className={"text-NoteTextColor"}>当前暂无登录过的账号...</span>
                    </div>
                )
            }

            <div className={"w-full flex justify-end"}>
                <Button
                    color="primary"
                    variant="light"
                    size={"sm"}
                    onPress={() => {
                        setState({
                            ...state,
                            loginStatus: "LoginForm"
                        })
                    }}
                >
                    <span>注册账号</span>
                    <span><AiOutlineArrowRight/></span>
                </Button>
            </div>
        </motion.div>
    );
};

export default LoginAccounts;

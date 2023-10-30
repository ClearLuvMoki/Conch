import {motion} from 'framer-motion';
import {Button, Card, CardBody, CardFooter, Spacer} from "@nextui-org/react";
import {AiOutlineArrowRight, AiOutlineDelete} from "react-icons/ai";
import {useContext, useEffect, useState} from "react";
import {handleLogin, LoginFormContext} from "@/Pages/Login";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResultsCode} from "@/types/ipc";
import {Avatar, AvatarGroup, User} from "@nextui-org/react";
import dayjs from "dayjs";
import {UserTypes} from "@/types/user";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const LoginAccounts = () => {
    const {state, setState} = useContext(LoginFormContext);
    const [chooseAccount, setChooseAccount] = useState<UserTypes>(null);
    const navigator = useNavigate();


    useEffect(() => {
        if (state.loginAccounts?.length) {
            setChooseAccount(state.loginAccounts[0])
        }
    }, [state.loginAccounts])


    useEffect(() => {
        handleGetAllUserAccounts();
    }, [])

    const handleGetAllUserAccounts = () => {
        InjectEnv.invoke(IpcChannels.user.find_all_user)
            .then((res) => {
                if (res.code === IpcResultsCode.success) {
                    setState({
                        ...state,
                        loginAccounts: res.data
                    })
                }
            })
    }

    const handleDelete = (userId: string) => {
        InjectEnv.invoke(IpcChannels.user.delete_user, {userId})
            .then(() => {
                toast.success("删除成功!")
            })
            .catch(() => {
                toast.error("删除失败!")
            })
            .finally(() => {
                handleGetAllUserAccounts();
            })
    }


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
                            chooseAccount?.id && (
                                <Card
                                    className={"mb-4 cursor-pointer"}
                                    key={chooseAccount.id}
                                    isPressable
                                >
                                    <CardBody className={"pb-0"}>
                                        <User
                                            name={chooseAccount.nickName}
                                            isFocusable={true}
                                            description={(
                                                <span>CreateTime: {dayjs(chooseAccount.createTime ?? "").format("YYYY.MM.DD HH:mm")}</span>
                                            )}
                                        />
                                    </CardBody>
                                    <CardFooter
                                        className=" bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end"
                                    >
                                        <Button
                                            color={"primary"}
                                            isIconOnly
                                            size={"sm"}
                                            radius={"full"}
                                            onPress={() => {
                                                handleLogin(chooseAccount, () => {
                                                    navigator("/", {replace: true})
                                                })
                                            }}
                                        >
                                            <AiOutlineArrowRight size={18} color={"white"}/>
                                        </Button>
                                        <Spacer x={2}/>
                                        <Button
                                            color={"danger"}
                                            isIconOnly
                                            size={"sm"}
                                            radius={"full"}
                                            onPress={() => {
                                                handleDelete(chooseAccount.userId)
                                            }}
                                        >
                                            <AiOutlineDelete size={18}/>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        }
                        <AvatarGroup
                            isBordered
                        >
                            {
                                state.loginAccounts.map(avatar => (
                                    <Avatar
                                        className={"cursor-pointer"}
                                        name={avatar.nickName} key={avatar.id}
                                        onClick={() => {
                                            setChooseAccount(avatar)
                                        }}
                                    />
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

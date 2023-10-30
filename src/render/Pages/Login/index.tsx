import Icon from "@/resources/desktop-icon.png"
import {Divider, Image,} from "@nextui-org/react";
import {motion} from "framer-motion";
import React, {createContext, useEffect, useState} from "react";
import LoginForm from "./components/LoginForm";
import LoginAccounts from "./components/LoginAccounts";
import {UserTypes} from "@/types/user";
import {setStore} from "@/Utils/tools";
import {LocalStorageKeys} from "@/src/common/LocalStorageKeys";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";

interface State {
    loginStatus: "LoginForm" | "LoginAccounts"
    loginFormData: Partial<UserTypes>;
    loading: boolean;
    loginAccounts: UserTypes[]
}

interface ContextState {
    state: State
    setState: React.Dispatch<State>
}


export const LoginFormContext = createContext<ContextState>(undefined);


export const handleLogin = (user: UserTypes, callback?: () => void) => {
    setStore(LocalStorageKeys.user.info, JSON.stringify(user ?? {}))
    callback && callback();
}

const Login = () => {
    const [state, setState] = useState<State>({
        loginStatus: "LoginForm",
        loginFormData: {
            nickName: "",
            password: ""
        },
        loading: false,
        loginAccounts: []
    })

    useEffect(() => {
        InjectEnv.invoke(IpcChannels.user.find_all_user)
            .then((res: IpcResults<UserTypes[], any>) => {
                if (res.code === IpcResultsCode.success && res?.data?.length > 0) {
                    setState({
                        ...state,
                        loginStatus: "LoginAccounts"
                    })
                }
            })
    }, [])

    return (
        <LoginFormContext.Provider
            value={{
                state,
                setState
            }}
        >
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

                    {
                        state.loginStatus === "LoginForm" && (<LoginForm/>)
                    }
                    {
                        state.loginStatus === "LoginAccounts" && (<LoginAccounts/>)
                    }

                    <Divider className={"my-2"}/>
                    <div className={"text-NoteTextColor text-sm"}>@Copyright ClearLuvMoki</div>
                </div>
            </div>
        </LoginFormContext.Provider>
    );
};

export default Login;

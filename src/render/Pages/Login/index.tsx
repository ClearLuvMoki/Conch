import Icon from "@/resources/desktop-icon.png"
import {Divider, Image,} from "@nextui-org/react";
import {motion} from "framer-motion";
import React, {createContext, useState} from "react";
import LoginForm from "./components/LoginForm";
import LoginAccounts from "./components/LoginAccounts";

interface State {
    loginStatus: "LoginForm" | "LoginAccounts"
    loginFormData: {
        nickName: string;
        password: string;
    };
    loading: boolean;
    loginAccounts: { id: string, nickName: string; password: string; createTime: string }[]
}

interface ContextState {
    state: State
    setState: React.Dispatch<State>
}


export const LoginFormContext = createContext<ContextState>(undefined);

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

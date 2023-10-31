import {getStore} from "../../../../../src/render/Utils/tools";
import {LocalStorageKeys} from "@/common/LocalStorageKeys";
import {useEffect} from "react";

const Home = () => {

    useEffect(() => {
        handleGetUserWiki()
    }, [])

    const handleGetUserWiki = () => {
        console.log(getStore(LocalStorageKeys.user.info), 'getStore(LocalStorageKeys.user.info)')
    }

    return (
        <div className={"w-full h-full flex justify-center p-6"}>
            <div className={"w-full lg:w-8/12 xl:w-7/12"}>
                <div className={"select-none"}>
                    <h2 className={"text-2xl font-bold"}>快捷访问</h2>

                </div>
            </div>
        </div>
    );
};

export default Home;

import HomeHeader from "@/Pages/Home/components/Header";
import {useEffect} from "react";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import to from "await-to-js"

// interface ItemType {
//     id: number;
//     name: string;
//     width: number,
//     height: number
// }

const Home = () => {

    useEffect(() => {
        handleGetSystemInfo()
    }, [])

    const handleGetSystemInfo = async () => {
        const [err, res] = await to(InjectEnv.invoke(IpcChannels.os.get_system_info))
        console.log(err, res)
    }

    return (
        <div className={"w-full h-full p-[20px] flex flex-col"}>
            <HomeHeader/>
        </div>
    );
};

export default Home;

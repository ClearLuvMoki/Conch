import React, {useEffect} from 'react';
import deepEqual from "deep-equal";
import GridCard from "@/Components/GridCard/Card";
import to from "await-to-js";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";

const SystemGridCard = React.memo(() => {

    useEffect(() => {
        handleGetSystemInfo()
    }, [])

    const handleGetSystemInfo = async () => {
        const [err, res] = await to(InjectEnv.invoke(IpcChannels.os.get_system_info))
        console.log(err, res)
    }

    return (
        <GridCard size={"4x2"}>
            1212
        </GridCard>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default SystemGridCard;

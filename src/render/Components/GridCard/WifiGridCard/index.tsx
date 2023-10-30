import React, {useEffect, useState} from 'react';
import deepEqual from "deep-equal";
import GridCard, {GridCardState} from "@/Components/GridCard/Card";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {IconWifiOutlined} from "@/src/render/Icon/Color";
import {useNetworkState, useUpdateEffect} from "react-use"

interface State {
    bssid: string;
    signal_level: number;
}


const WifiGridCard = React.memo(() => {
    const [state, setState] = useState<GridCardState<Partial<State>>>({
        loading: true,
        error: {isError: false, errorInfo: null},
        params: null
    })
    const netWorkState = useNetworkState();

    useEffect(() => {
        handleGetCurrentWifi();
    }, [])

    const $SignalLevel = React.useMemo(() => {
        if (state?.params?.signal_level <= -100) {
            return "差"
        } else if (-100 < state?.params?.signal_level && state?.params?.signal_level <= -77) {
            return "一般"
        } else if (-77 < state?.params?.signal_level && state?.params?.signal_level <= -55) {
            return "良好"
        } else {
            return "优秀"
        }
    }, [state?.params?.signal_level])

    useUpdateEffect(() => {
        if (netWorkState.online) {
            handleGetCurrentWifi();
        }
    }, [netWorkState.online])

    const handleGetCurrentWifi = () => {
        InjectEnv.invoke(IpcChannels.os.wifi, {type: "current"})
            .then((res: any) => {
                if (res) {
                    const current = JSON.parse(res || "{}")?.[0] ?? {};
                    setState((prevState) => ({...prevState, params: current}))
                }
            })
            .finally(() => {
                setState((prevState) => ({...prevState, laoding: false}))
            })
    }

    return (
        <GridCard
            id={"WifiGridCard"}
            size={"2x1"}
            loading={false}
            className={"flex justify-evenly items-center p-[10px]"}
        >
            <div className={"flex flex-col gap-1"}>
                <IconWifiOutlined className={"text-4xl"}/>
                <div style={{fontFamily: "cursive"}}>{state.params?.bssid}</div>
            </div>
            <div className={"flex flex-col gap-1 text-[10px] justify-center"}>
                {
                    netWorkState.online && (
                        <React.Fragment>
                            <div>
                                <span>信号强弱:  </span>
                                <span>{$SignalLevel}</span>
                            </div>
                            <div>
                                <span>下行速度:  </span>
                                <span>{netWorkState.downlink || 0}/Mbps</span>
                            </div>
                        </React.Fragment>
                    )
                }
                <div>
                    <span>网络连接:  </span>
                    <span>{netWorkState.online ? "正常" : "失败"}</span>
                </div>

            </div>
        </GridCard>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default WifiGridCard;

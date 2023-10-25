import React, {useEffect, useRef, useState} from 'react';
import deepEqual from "deep-equal";
import to from "await-to-js";
import {Chart} from '@antv/g2';
import GridCard, {GridCardState} from "@/Components/GridCard/Card";
import InjectEnv from "@/src/render/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {motion} from 'framer-motion';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import {useUpdateEffect} from 'react-use';

dayjs.extend(duration);

type State = {
    arch: string;
    platform: string;
    hostname: string;
    type: string;
    uptime: number;
    cpu: {
        count: number;
        usage: number;
    };
    memory: {
        free: number;
        freeMemPercentage: number;
        total: number;
        usage: number;
    }
}


const SystemGridCard = React.memo(() => {
    const [state, setState] = useState<GridCardState<Partial<State>>>({
        loading: true,
        error: {isError: false, errorInfo: null},
        params: null
    })
    const chartsRef = useRef<any>();

    useEffect(() => {
        const cpuUsage = ((state.params?.cpu?.usage || 0) / 100) || 0;
        const memoryUsage = ((100 - (state.params?.memory?.freeMemPercentage || 0)) / 100) || 0;
        const chart = new Chart({
            container: 'SystemGridCard-charts',
        });
        chart.options({
            type: "view",
            width: 170,
            height: 170,
            coordinate: {type: "radial", innerRadius: 0.2},
            data: [
                {
                    name: 'Memory Usage',
                    percent: memoryUsage,
                    color: '#1ad5de',
                },
                {
                    name: 'Cpu Usage',
                    percent: cpuUsage,
                    color: '#a0ff03',
                },
            ],
            children: [
                {
                    type: "interval",
                    encode: {x: "name", y: 1, size: 52, color: "color"},
                    scale: {color: {type: "identity"}},
                    style: {fillOpacity: 0.25},
                    animate: false,
                    tooltip: false
                },
                {
                    type: "interval",
                    encode: {x: "name", y: "percent", color: "color", size: 52},
                    style: {
                        radius: 26,
                        shadowColor: "rgba(0,0,0,0.45)",
                        shadowBlur: 20,
                        shadowOffsetX: -2,
                        shadowOffsetY: -5,
                        transition: "all .3s"
                    },
                    class: "transition-all",
                    animate: {
                        enter: {
                            type: 'fadeIn',
                            easing: 'easing-out-bounce',
                            duration: 1000,
                        }
                    },
                    axis: false,
                },
            ],
        })
        chart.interaction('tooltip', {
            render: (_, {title, items}) => {
                return `<div>${title}: ${((items?.[0]?.value || 0) * 100)?.toFixed(2)}%</div>`
            }
        });
        chart.render();
        chartsRef.current = chart;
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            handleGetSystemInfo()
        }, 3000)
        return () => {
            clearInterval(timer);
        }
    }, [])

    useUpdateEffect(() => {
        const cpuUsage = ((state.params?.cpu?.usage || 0) / 100) || 0;
        const memoryUsage = ((100 - (state.params?.memory?.freeMemPercentage || 0)) / 100) || 0;
        chartsRef.current.changeData([
            {
                name: 'Memory Usage',
                percent: memoryUsage,
                color: '#1ad5de',
            },
            {
                name: 'Cpu Usage',
                percent: cpuUsage,
                color: '#a0ff03',
            },
        ])
    }, [state?.params])

    const handleGetSystemInfo = async () => {
        const [_, res] = await to(InjectEnv.invoke(IpcChannels.os.get_system_info))
        setState((prevState) => ({...prevState, loading: false, params: res}))
    }

    return (
        <GridCard size={"4x2"} id={"SystemGridCard"} className={"flex justify-between"} loading={state.loading}>
            <div
                className={"w-[1/2] p-[20px] text-PrimaryBlack font-semibold text-[12px] flex flex-col gap-1 justify-center"}>
                <div>Arch: {state.params?.arch}</div>
                <div>Host Name: {state.params?.hostname}</div>
                <div>Cpu Count: {state.params?.cpu.count}</div>
                <div>Cpu Usage: {(state.params?.cpu.usage || 0).toFixed(2)}%</div>
                <div>Memory Usage: {((100 - (state.params?.memory.freeMemPercentage || 0))).toFixed(2)}%</div>
                <div>Uptimes: {dayjs.duration((state.params?.uptime || 0), 'seconds').format('HH:mm')}</div>
            </div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                id={"SystemGridCard-charts"}
                className={"w-[170px] h-[170px]"}
            />
        </GridCard>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default SystemGridCard;

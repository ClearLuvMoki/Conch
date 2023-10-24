import React from 'react';
import deepEqual from "deep-equal";
import {BaseBox, BoxSize} from "@/Components/Scaffold";
import {motion} from "framer-motion"
import {Skeleton} from "@nextui-org/react";

interface Props {
    id: string;
    size: BoxSize;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    loading?: boolean;
}

export interface GridCardState<T> {
    loading: boolean;
    error: {
        isError: boolean;
        errorInfo: string;
    };
    params: T
}


const Loading = () => {
    return <div className="w-full h-full flex flex-col gap-2 justify-center px-[20px]">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-2/3 rounded-lg"/>
        <Skeleton className="h-3 w-2/5 rounded-lg"/>
        <Skeleton className="h-3  rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
    </div>
}

const GridCard = React.memo(({id = "", size, style = {}, className = "", loading = false, children}: Props) => {

    const $BoxStyle = React.useMemo(() => {
        switch (size) {
            case "1x1":
                return {width: BaseBox.width, height: BaseBox.height, gridRow: 'span 1', gridColum: 'span 1'};
            case "1x2":
                return {
                    width: BaseBox.width * 2 + BaseBox.margin,
                    height: BaseBox.height,
                    gridRow: 'span 1',
                    gridColum: 'span 2'
                };
            case "2x1":
                return {
                    width: BaseBox.width * 2 + BaseBox.margin,
                    height: BaseBox.height,
                    gridRow: 'span 1',
                    gridColum: 'span 2'
                };
            case "2x2":
                return {
                    width: BaseBox.width * 2 + BaseBox.margin,
                    height: BaseBox.height * 2 + BaseBox.margin,
                    gridRow: 'span 2',
                    gridColum: 'span 2'
                };
            case "2x4":
                return {
                    width: BaseBox.width * 2 + BaseBox.margin,
                    height: BaseBox.height * 4 + BaseBox.margin * 3,
                    gridRow: 'span 4',
                    gridColum: 'span 2'
                };
            case "4x2":
                return {
                    width: BaseBox.width * 4 + BaseBox.margin * 3,
                    height: BaseBox.height * 2 + BaseBox.margin,
                    gridRow: 'span 2',
                    gridColum: 'span 4'
                };
            case "4x4":
                return {
                    width: BaseBox.width * 4 + BaseBox.margin * 3,
                    height: BaseBox.height * 4 + BaseBox.margin * 3,
                    gridRow: 'span 4',
                    gridColum: 'span 4'
                };
        }
    }, [size])


    return (
        <motion.div
            id={id}
            layout
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className={className}
            style={{
                width: $BoxStyle.width,
                height: $BoxStyle.height,
                background: "rgb(250, 250, 250)",
                gridRow: $BoxStyle.gridRow,
                gridColumn: $BoxStyle.gridColum,
                borderRadius: 14,
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                ...style
            }}
        >
            {
                loading ? <Loading/> : (children)
            }
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default GridCard;

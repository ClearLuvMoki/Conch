import React from 'react';
import deepEqual from "deep-equal";
import {BoxSize} from "../../index.tsx";
import {handleCalculateSize} from "@/src/Utils/tools.ts";

interface GridCardProps {
    componentId: string;
    size: BoxSize;
    children: React.ReactNode;
}

const GridCard = React.memo((props: GridCardProps) => {
    const {componentId, size, children} = props
    return (
        <div
            style={{
                width: handleCalculateSize(size).width,
                height: handleCalculateSize(size).height
            }}
            data-id={componentId}
        >
            {children}
        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default GridCard;

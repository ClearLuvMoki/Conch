import React from 'react';
import deepEqual from "deep-equal";
import {BoxSize} from "../../index.tsx";
import {handleCalculateSize} from "@/src/Utils/tools.ts";

interface GridCardProps {
    componentId: string;
    size: BoxSize;
}

const GridCard = React.memo((props: GridCardProps) => {
    const {componentId, size} = props
    return (
        <div
            style={{
                width: handleCalculateSize(size).width,
                height: handleCalculateSize(size).height
            }}
            data-id={componentId}
        >

        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default GridCard;

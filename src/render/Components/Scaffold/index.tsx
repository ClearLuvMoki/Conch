import React, {useEffect, useRef} from "react";
import Sortable from "sortablejs";


interface Props {
    componentsList: { componentId: string, component: React.ReactNode }[]
}

export type BoxSize = '1x1' | '1x2' | '2x1' | '2x2' | '2x4' | '4x2' | "4x4";
export const BaseBox = {
    width: 78,
    height: 78,
    margin: 15,
}

const Scaffold = ({componentsList}: Props) => {
    const $container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Sortable.create($container.current, {
            delay: 0,
            animation: 150,
            sort: true,
            ghostClass: "opacity-40"
        })
    }, [])

    return (
        <div
            ref={$container}
            style={{
                width: "100%",
                height: "100%",
                overflow: "scroll",
                overflowX: "hidden",
                display: "grid",
                gridTemplateRows: `repeat(auto-fill, ${BaseBox.width}px)`,
                gridTemplateColumns: `repeat(auto-fill, ${BaseBox.height}px)`,
                gridRowGap: BaseBox.margin,
                gridColumnGap: BaseBox.margin,
                gridAutoFlow: "dense",
                padding: 10
            }}
        >
            {
                componentsList?.map(node => {
                    return (
                        <React.Fragment key={node.componentId}>
                            {node.component}
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
};

export default Scaffold;

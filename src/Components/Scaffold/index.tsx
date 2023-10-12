/**
 * Author: Moki
 * Date: 2023-10-12
 * FileName: Grid 拖拽
 **/
import React, {useEffect, useRef} from 'react';
import deepEqual from 'deep-equal';
import {LayoutImpl} from "./LayoutImpl.ts";
import GridCard from "./components/GridCard";
import {GridCardHeight, GridCardWidth} from "@/constant/ui.tsx";

/**
 * @description 容器盒子大小
 */
export type BoxSize = '1x1' | '1x2' | '2x1' | '2x2' | '2x4' | '4x2' | '4x4'

interface ScaffoldProps {
    componentsList: { size: BoxSize, id: string }[]
}

const Scaffold = React.memo((props: ScaffoldProps) => {
    const {componentsList} = props
    // 布局容器
    let $container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 布局控制类 实例化并存储引用
        const instance = new LayoutImpl($container, {
            onEnd: () => {
            }
        })
        // 保存实例的引用
        $container.current = instance

        return () => {
            instance?.dispose()
        }
    }, [])

    return (
        <div
            ref={$container}
            className={"grid w-full h-full overflow-hidden justify-center select-none"}
            style={{
                gridAutoFlow: "dense",
                gridTemplateColumns: `repeat(auto-fill, ${GridCardWidth})`,
                gridTemplateRows: `repeat(auto-fill, ${GridCardHeight})`
            }}
        >
            {
                componentsList?.map((info) =>
                    <GridCard
                        key={info.id}
                        size={info.size}
                        componentId={info.id}
                    />)
            }
        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default Scaffold;

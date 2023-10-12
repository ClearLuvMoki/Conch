import React from 'react';
import deepEqual from "deep-equal";
import {Button} from "@nextui-org/react";
import {BiMoon, BiMenuAltRight, BiBell} from "react-icons/bi"

const HomeHeader = React.memo(() => {
    return (
        <div className={"w-full h-[60px] flex justify-end gap-[8px]"}>
            <Button isIconOnly color={"primary"} variant="light">
                <BiMoon fontSize={20} color={"#000"}/>
            </Button>
            <Button isIconOnly color={"primary"} variant="light">
                <BiBell fontSize={20} color={"#000"}/>
            </Button>
            <Button isIconOnly color={"primary"} variant="shadow">
                <BiMenuAltRight fontSize={20} color={"#fff"}/>
            </Button>
        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default HomeHeader;

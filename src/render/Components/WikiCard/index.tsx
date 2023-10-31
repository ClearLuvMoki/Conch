import React from 'react';
import deepEqual from "deep-equal";
import {Card, CardBody, CardFooter} from "@nextui-org/react";
import {WikiTypes} from "@/types/wiki";
import {motion} from 'framer-motion';
import dayjs from "dayjs";

interface WikiCardProps {
    wiki: WikiTypes
}

const WikiCard = React.memo(({wiki}: WikiCardProps) => {
    return (
        <motion.div
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {
                    y: 0,
                    opacity: 1
                }
            }}
        >
            <Card
            >
                <CardBody>
                    <div className={"text-lg font-bold"}>{wiki.title}</div>
                    <div className={"text-NoteTextColor"}>{wiki.description}</div>
                </CardBody>
                <CardFooter className={"pt-0 flex justify-end"}>
                    <span
                        className={"text-NoteTextColor text-xs"}
                    >
                        创建时间: {dayjs(wiki.createTime).format("YYYY.MM.DD HH:mm")}
                    </span>
                </CardFooter>
            </Card>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default WikiCard;

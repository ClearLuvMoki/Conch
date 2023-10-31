import {useEffect} from "react";
import ThinkLayout from "./components/ThinkLayout";
import {WikiStore} from "@/Stores/WIki";
import {observer} from "mobx-react";
import WikiCard from "@/Components/WikiCard";
import {motion} from "framer-motion";

const Think = observer(() => {

    useEffect(() => {
        handleGetUserWiki()
    }, [])

    const handleGetUserWiki = () => {
        WikiStore.getWikiList()
    }

    return (
        <div className={"w-full h-full p-6"}>
            <ThinkLayout/>
            <div className={"flex justify-center"}>
                <div className={"w-full lg:w-8/12 xl:w-7/12"}>
                    <div className={"select-none"}>
                        <h2 className={"text-2xl font-bold mb-4"}>快捷访问</h2>
                        <motion.div
                            className={"gap-2 grid lg:grid-cols-2 xl:grid-cols-3"}
                            variants={{
                                hidden: {opacity: 1, scale: 0},
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        delayChildren: 0.1,
                                        staggerChildren: 0.2
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="visible"
                        >
                            {
                                WikiStore.wikiList.length > 0 ? WikiStore.wikiList.map(wiki => (
                                    <WikiCard wiki={wiki} key={wiki.wikiId}/>
                                )) : (
                                    <div className={"text-NoteTextColor text-center"}>创建的知识库会出现在此处...</div>)
                            }
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Think;

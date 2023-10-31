import React, {useState} from "react";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from "@nextui-org/react";
import deepEqual from "deep-equal";
import {WikiStore} from "@/Stores/WIki";
import {WikiTypes} from "@/types/wiki";

interface WikiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WikiModal = React.memo(({isOpen, onClose}: WikiModalProps) => {
    const [wikiData, setWikiData] = useState<Partial<WikiTypes>>(null)
    const [loading, setLoading] = useState(false);

    const handleAddWiki = () => {
        setLoading(true)
        WikiStore.addWikiList({
            title: wikiData.title,
            description: wikiData.description
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal
            backdrop={"blur"}
            isOpen={isOpen}
            onClose={() => {
                onClose && onClose()
            }}
        >
            <ModalContent>
                {() => (
                    <React.Fragment>
                        <ModalHeader>新建知识库</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="名称"
                                size={"sm"}
                                onValueChange={(value) => {
                                    setWikiData((prevState) => ({
                                        ...prevState,
                                        title: value
                                    }))
                                }}
                            />
                            <Textarea
                                placeholder={"请输入知识库描述"}
                                onValueChange={(value) => {
                                    setWikiData((prevState) => ({
                                        ...prevState,
                                        description: value
                                    }))
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant={"shadow"} onPress={onClose}>
                                取消
                            </Button>
                            <Button
                                isLoading={loading}
                                color="primary"
                                variant={"shadow"}
                                onPress={() => {
                                    handleAddWiki()
                                }}
                            >
                                新建
                            </Button>
                        </ModalFooter>
                    </React.Fragment>
                )}
            </ModalContent>
        </Modal>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default WikiModal;

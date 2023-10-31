import React from "react";
import WikiModal from "@/Components/WIkiModal";
import deepEqual from "deep-equal";
import {WikiStore} from "@/Stores/WIki";
import {observer} from "mobx-react"

// 该组件使用store调用， 在页面中一次只会出现一个;

const CommonComponents = React.memo(observer(() => {
    return (
        <React.Fragment>
            <WikiModal
                isOpen={WikiStore.wikiModalState.isOpen}
                onClose={() => {
                    WikiStore.updateWikiModalState({
                        isOpen: false,
                        wikiData: null
                    })
                }}
            />
        </React.Fragment>
    );
}), (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});


export default CommonComponents;

import {action, makeAutoObservable, observable} from "mobx";
import {WikiTypes} from "@/types/wiki";
import InjectEnv from "@/RIpc/InjectEnv";
import IpcChannels from "@/src/common/IpcChannels";
import {UserStore} from "@/Stores/User";
import to from "await-to-js";
import {IpcResults, IpcResultsCode} from "@/types/ipc";

interface WikiModalState {
    isOpen: boolean;
    wikiData: WikiTypes;
}

class $WikiStore {
    constructor() {
        makeAutoObservable(this, {
            wikiList: observable,
            wikiModalState: observable,
            updateWikiModalState: action,
        })
    }

    wikiList: WikiTypes[] = [];

    wikiModalState: WikiModalState = {
        isOpen: false,
        wikiData: null
    }

    updateWikiModalState(state: Partial<WikiModalState>) {
        this.wikiModalState = {
            ...this.wikiModalState,
            ...state
        }
    }

    async getWikiList() {
        const {userId} = UserStore.userInfo;
        const [err, res]: [Error, IpcResults<WikiTypes[], string>] = await to(InjectEnv.invoke(IpcChannels.wiki.get_all_wiki_user, {userId}))
        if (err || res?.code === IpcResultsCode.error) {
            this.wikiList = [];
        } else {
            this.wikiList = res.data;
        }
    }

    async addWikiList(wiki: Partial<WikiTypes>) {
        const {userId} = UserStore.userInfo;
        await InjectEnv.invoke(IpcChannels.wiki.add_wiki_user, {
            userId,
            wikiData: wiki
        })
        await this.getWikiList();
    }
}

export const WikiStore = new $WikiStore();

import {action, makeAutoObservable, observable} from "mobx";
import {WikiTypes} from "@/types/wiki";
import InjectEnv from "@/RIpc/InjectEnv";

export class $WikiStore {
    constructor() {
        makeAutoObservable(this, {
            wikiList: observable,
            initWikiList: action,
        });
    };


    initWikiList = async () => {
        InjectEnv.invoke("")
    }

    wikiList: WikiTypes[] = [];
}

export const WikiStore = new $WikiStore();

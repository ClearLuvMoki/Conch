import {makeAutoObservable, observable} from "mobx"
import {UserTypes} from "@/types/user";
import {getStore, jsonParse, setStore} from "@/Utils/tools";
import {LocalStorageKeys} from "@/src/common/LocalStorageKeys";
import {WikiStore} from "@/Stores/WIki";

export class $UserStore {
    constructor() {
        makeAutoObservable(this, {
            userInfo: observable,
        })
    }

    userInfo: UserTypes = null;

    getUserInfo(): UserTypes {
        this.userInfo = jsonParse(getStore(LocalStorageKeys.user.info));
        return this.userInfo;
    }

    setUserInfo(userInfo: UserTypes) {
        setStore(LocalStorageKeys.user.info, userInfo || {});
        this.userInfo = userInfo;
    }


    initUserData() {
        // wiki
        WikiStore.getWikiList();
    }

}

export const UserStore = new $UserStore();

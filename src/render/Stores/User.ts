import {makeAutoObservable, observable} from "mobx"
import {UserTypes} from "@/types/user";
import {getStore, jsonParse, setStore} from "@/Utils/tools";
import {LocalStorageKeys} from "@/src/common/LocalStorageKeys";

export class $UserStore {
    constructor() {
        makeAutoObservable(this, {
            userInfo: observable,
        })
    }

    userInfo: UserTypes = null;

    getUserInfo() {
        let userInfo = getStore(LocalStorageKeys.user.info);
        userInfo = jsonParse(userInfo, {})
        return userInfo;
    }

    setUserInfo(userInfo: UserTypes) {
        setStore(LocalStorageKeys.user.info, JSON.stringify(userInfo || {}));
    }

}

export const UserStore = new $UserStore();

// @ts-nocheck
import {IpcResults} from "@/types/ipc";

export default class InjectEnv {
    public static invoke(channel: string, ...arg: any[]): Promise<IpcResults<any, string>> {
        return window.__IPC__.invoke(channel, ...arg);
    }

    public static ipcOn(channel: string, ...arg: any[]) {
        return window.__IPC__.ipcOn(channel, ...arg);
    }

    public static ipcSend(channel: string, ...arg: unknown[]) {
        return window.__IPC__.ipcSend(channel, ...arg);
    }


    public static ipcRemoveAllListeners(channel: string) {
        return window.__IPC__.ipcRemoveAllListeners(channel);
    }
}



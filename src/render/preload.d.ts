import {IpcRendererEvent} from 'electron';

declare global {
    interface Window {
        __IPC__: {
            invoke: (channel: string, ...arg: any[]) => Promise<any>;
            ipcOn: (channel: string, func: (event: IpcRendererEvent, ...arg: unknown[]) => void) => Electron.IpcRenderer;
            ipcRemoveListener: (
                channel: string,
                listener: (event: IpcRendererEvent, ...arg: unknown[]) => void
            ) => void;
            ipcRemoveAllListeners: (channel: string) => void;
        },
    }
}
export {};


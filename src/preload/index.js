const {contextBridge, ipcRenderer, IpcRendererEvent} = require('electron');

contextBridge.exposeInMainWorld('__IPC__', {
    invoke: (channel, data) => {
        return ipcRenderer.invoke(channel, data);
    },
    ipcOn: (channel, func) => {
        const subscription = (event, ...args) =>
            func(event, ...args);
        ipcRenderer?.on(channel, subscription);
        return () => ipcRenderer.removeListener(channel, subscription);
    },
    ipcRemoveListener: (
        channel,
        listener
    ) => {
        ipcRenderer.removeListener(channel, listener);
    },
    ipcRemoveAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
});

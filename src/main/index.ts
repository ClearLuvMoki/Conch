import {BrowserWindow, app} from "electron"
import {OSIpc} from "./Ipc"
import {resolve} from "path";

const LoadUrl: string = "http:localhost:8080";
export let mainWindow: BrowserWindow = null;


const initData = () => {
    return new Promise(() => {
        try {
            OSIpc()
        } catch (e) {
            console.log("Init IPC error", e)
        }
    })
}
const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 1072,
        minWidth: 1072,
        height: 730,
        minHeight: 730,
        useContentSize: true,
        transparent: true,
        frame: false,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            nodeIntegration: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegrationInSubFrames: true,
            plugins: true,
            preload: resolve(__dirname, "../preload/index.js")
        },
    });
    initData();
    return mainWindow.loadURL(LoadUrl)
}
app.whenReady().then(() => {
    return createWindow();
});


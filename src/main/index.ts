import {BrowserWindow, app} from "electron"
import {OSIpc} from "./Ipc"
import {resolve} from "path";
import {isDev} from "@/src/main/main-utils";
import UserDatabase from "@/src/main/database/User/user.service";

const LoadUrl: string = isDev ? "http:localhost:8080" : `file://${resolve(__dirname, '../render/', 'index.html')}`;
export let mainWindow: BrowserWindow = null;


const iconPath = resolve(__dirname, "../../app/resources/desktop-icon.png");

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
        icon: iconPath,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            nodeIntegration: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegrationInSubFrames: true,
            plugins: true,
            preload: resolve(__dirname, isDev ? "../preload/index.js" : "./preload.js")
        },
    });
    initData();
    return mainWindow.loadURL(LoadUrl)
}
app.whenReady().then(() => {
    setTimeout(() => {
        UserDatabase.addUser()
    }, 5000)
    return createWindow();
});


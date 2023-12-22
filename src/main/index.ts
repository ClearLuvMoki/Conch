const {BrowserWindow} = require("electron")
const { isDev } = require("./main-utils")
const {resolve} = require("path")


const LoadUrl: string = isDev ? `http:localhost:${process.env.PORT || 8888}` : `file://${resolve(__dirname, '../render/', 'index.html')}`;
export let mainWindow = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 800,
        height: 100,
        minHeight: 100,
        useContentSize: true,
        transparent: true,
        frame: false,
        hasShadow: true,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            preload: resolve(__dirname, isDev ? "../preload/index.js" : "./preload.js")
        },
    });
    mainWindow.loadURL(LoadUrl)
}

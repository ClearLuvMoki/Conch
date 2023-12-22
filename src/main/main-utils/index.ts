const {app} = require("electron")

export const isDev = !app.isPackaged;

import {app} from "electron";
import * as path from "path";

export const ConchDataPath = path.join(
    app.getPath("appData"),
    app.getName(),
    "./ConchData"
)

export {default as OSIpc} from "./os"

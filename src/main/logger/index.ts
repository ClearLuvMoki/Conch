import logger from 'electron-log';
import IpcChannels from "@/src/common/IpcChannels";
import {mainWindow} from "@/src/main";
import {isDev} from "@/src/main/main-utils";

logger.transports.file.maxSize = 1002430;
logger.transports.file.format =
    '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}';

// dev debugger
const handleSendLoggerToRender = (params) => {
    if (isDev) {
        mainWindow.webContents.send(IpcChannels.debug.send_logger_to_render, params)
    }
}

const MainLogger = {
    info(param) {
        logger.info(param);
        handleSendLoggerToRender(param);
    },
    warn(param) {
        logger.warn(param);
        handleSendLoggerToRender(param);
    },
    error(param) {
        logger.error(param);
        handleSendLoggerToRender(param);
    },
};

export default MainLogger;

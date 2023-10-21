import {ipcMain} from "electron"
import IpcChannels from "@/src/common/IpcChannels";
import MainLogger from "@/src/main/logger";

const os = require('node-os-utils');

const OSIPc = () => {
    ipcMain.handle(IpcChannels.os.get_system_info, () => {
        return new Promise(async (resolve, reject) => {
            try {
                const cpu = os.cpu;
                const system = os.os;
                const mem = os.mem;
                const cpuUsage = await cpu.usage();
                const memoryInfo = await mem.info();
                const serverInfo = {
                    platform: process.platform,
                    cpu: {
                        count: cpu.count(),
                        usage: cpuUsage
                    },
                    memory: {
                        total: mem.totalMem(),
                        usage: memoryInfo.usedMemMb,
                        free: memoryInfo.freeMemMb,
                        freeMemPercentage: memoryInfo.freeMemPercentage
                    },
                    uptime: system.uptime(),
                    hostname: system.hostname(),
                    type: system.type(),
                    arch: system.arch(),
                };
                resolve(serverInfo)
            } catch (e) {
                reject(e);
                MainLogger.warn(`IpcChannels.os.get_system_info: err${JSON.stringify(e)}`)
            }
        })
    })
}

export default OSIPc;

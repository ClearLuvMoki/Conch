import {ipcMain} from "electron"
import IpcChannels from "@/src/common/IpcChannels";
import MainLogger from "@/src/main/logger";
import UserDatabase from "@/src/main/database/User/user.service";

const os = require('node-os-utils');
const wifi = require("node-wifi");

const OSIPc = () => {

    ipcMain.handle("test:add", () => {
        return UserDatabase.addUser()
    })


    // 处理wifi信息
    ipcMain.handle(IpcChannels.os.wifi, (_, {type}: { type: "scan" | "current" | "connect" | "disconnect" }) => {
        return new Promise((resolve, reject) => {
            try {
                wifi.init({
                    iface: null // network interface, choose a random wifi interface if set to null
                });

                switch (type) {
                    case "scan":
                        return wifi.scan((error, networks) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(JSON.stringify(networks))
                            }
                        })
                    case "current":
                        return wifi.getCurrentConnections((error, currentConnections) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(JSON.stringify(currentConnections))
                            }
                        })

                }
            } catch (e) {
                reject(e);
                MainLogger.warn(`IpcChannels.os.wifi: err${JSON.stringify(e)}`)
            }
        })
    });

    // 获取系统层级的信息
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

// @ts-nocheck
export default class InjectEnv {
  public static invoke(channel: string, ...arg: any[]) {
    return window.__IPC__.invoke(channel, ...arg);
  }

  public static ipcOn(channel: string, ...arg: any[]) {
    return window.__IPC__.ipcOn(channel, ...arg);
  }

  public static ipcRemoveAllListeners(channel: string) {
    return window.__IPC__.ipcRemoveAllListeners(channel);
  }
}



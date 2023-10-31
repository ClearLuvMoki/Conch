export const getStore = (key: string) => {
    try {
        return localStorage.getItem(key) || '';
    } catch (e) {
        return void 0;
    }
};

export const setStore = (key: string, value: any) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        return void 0;
    }
};


export const deleteStore = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        return void 0;
    }
};

export const jsonParse = (str: string, defaults?: any) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log("解析失败", e)
        return defaults || null;
    }
};

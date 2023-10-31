export const getStore = (key: string) => {
    try {
        const item = localStorage.getItem(key) || '';
        return item;
    } catch (e) {
        console.log(e);
        return void 0;
    }
};

export const setStore = (key: string, value: string) => {
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
        return defaults || null;
    }
};

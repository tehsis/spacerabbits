interface Storage {
    setItem(key: string, value: Object): Promise<string>
    getItem(key: string): Promise<object>
}

const BrowserStorage: Storage = {
    setItem: async (key, value) => {
        const object = JSON.stringify(value);
        window.localStorage.setItem(key, object);
        return object;
    },

    getItem: async (key) => {
        const item = window.localStorage.getItem(key);
        return JSON.parse(item);
    }
};

export default BrowserStorage;
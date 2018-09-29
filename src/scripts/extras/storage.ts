interface Storage {
    setItem(key: string, value: Object): Promise<string>
    getItem(key: string): Promise<object>
}

// This is the plugin used in Cordova for LocalStorage.
declare let NativeStorage: Storage; 

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

const storage = window.cordova ? BrowserStorage : (window as any).NativeStorage;

export default BrowserStorage;
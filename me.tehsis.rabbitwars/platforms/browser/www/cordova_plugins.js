cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/twitter-connect-plugin/www/TwitterConnect.js",
        "id": "twitter-connect-plugin.TwitterConnect",
        "pluginId": "twitter-connect-plugin",
        "clobbers": [
            "TwitterConnect"
        ]
    },
    {
        "file": "plugins/cordova-plugin-facebook4/www/facebook-browser.js",
        "id": "cordova-plugin-facebook4.FacebookConnectPluginBrowser",
        "pluginId": "cordova-plugin-facebook4",
        "clobbers": [
            "facebookConnectPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "id": "cordova-plugin-nativestorage.mainHandle",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
            "NativeStorage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "pluginId": "cordova-plugin-nativestorage"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "twitter-connect-plugin": "0.6.0",
    "cordova-plugin-facebook4": "1.9.1",
    "cordova-plugin-nativestorage": "2.2.2"
}
// BOTTOM OF METADATA
});
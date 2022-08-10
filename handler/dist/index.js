"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var mainWindow = null;
var _debug = false; // only for development
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        electron_1.app.setAsDefaultProtocolClient('jaqexplorer', process.execPath, [path.resolve(process.argv[1])]);
    }
}
else {
    electron_1.app.setAsDefaultProtocolClient('jaqexplorer');
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var openFolderOrFile = function (link) {
    if (link && link.indexOf('jaqexplorer://') === 0) {
        link = decodeURI(link);
        electron_1.shell.openExternal(link.replace('jaqexplorer://', '').replace(/\\/g, '/'));
        logEverywhere("Open file or folder: " + JSON.stringify(link));
        electron_1.app.quit(); // close this app
    }
};
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', function (event, commandLine) {
        // Someone tried to run a second instance, we should focus our window.
        logEverywhere(JSON.stringify(commandLine));
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}
var createWindow = function () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    // Open the DevTools.
    if (_debug) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    if (process.platform === 'win32') {
        var url = process.argv.slice(1).pop();
        openFolderOrFile(url);
    }
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.on('will-finish-launching', function () {
    electron_1.app.on('open-url', function (event, url) {
        openFolderOrFile(url);
    });
});
function logEverywhere(s) {
    if (_debug) {
        console.log(s);
        // mainWindow is main browser window of your app
        if (mainWindow && mainWindow.webContents) {
            mainWindow.webContents.executeJavaScript("console.log('".concat(s, "')"));
        }
    }
}
//# sourceMappingURL=index.js.map
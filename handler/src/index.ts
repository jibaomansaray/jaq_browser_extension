import { app, BrowserWindow, shell} from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;
const _debug = true; // only for development

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('jaqexplorer', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('jaqexplorer')
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const openFolderOrFile = (link: string) => {
  if (link && link.indexOf('jaqexplorer://') === 0) {
    link = decodeURI(link);
    shell.openExternal(link.replace('jaqexplorer://', '').replace(/\\/g, '/'));
    logEverywhere("Open file or folder: " + JSON.stringify(link))
    app.quit(); // close this app
  }
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine) => {
    // Someone tried to run a second instance, we should focus our window.
    logEverywhere(JSON.stringify(commandLine));
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
}

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../src/index.html'));

  // Open the DevTools.
  if (_debug) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.platform === 'win32') {
    const url = process.argv.slice(1).pop() 
    openFolderOrFile(url);
  }

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-finish-launching', () => {
  app.on('open-url', (event, url) => {
    openFolderOrFile(url)
  })
})


function logEverywhere (s: unknown) {
  if (_debug === true) {
    console.log(s);
    // mainWindow is main browser window of your app
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.executeJavaScript(`console.log('${s}')`);
    }
  }
}
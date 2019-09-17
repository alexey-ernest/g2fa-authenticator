
const {app, BrowserWindow, session, Menu } = require('electron');
const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// page session
let defaultSession;

const createAuthenticatorWindow = () => {

    const win = new BrowserWindow({
        width: 500,
        height: 250,
        webPreferences: {
            nodeIntegration: true,
            session: defaultSession
        }
    });

    win.loadFile('index.html');

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.webContents.on('did-finish-load', () => {
        mainWindow = win;
    });

    win.on('closed', () => {
        mainWindow = null;
    });

    return win;
};

const onAppReady = () => {
    defaultSession = session.defaultSession;
    createAuthenticatorWindow();
};

const onAllWindowsClosed = () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
};

const onActivate = () => {
    if (mainWindow === null) {
        createAuthenticatorWindow();
    }
};

// entry point
(() => {

    app.on('ready', onAppReady);
    app.on('window-all-closed', onAllWindowsClosed);
    app.on('activate', onActivate);

    // enable shortcuts
    const template = [{
        label: "Google 2fa authenticator",
        submenu: [
            { label: "Quit", accelerator: "Command+Q", click: () => { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template)); 
})();

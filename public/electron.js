// ./main.js
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

// connect to our socket from the local device simulator
var io = require('socket.io-client');
var socket = io('http://localhost:7003');

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });

  // Specify entry point
  // win.loadURL('http://localhost:3000');
  const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/index.html'),
      protocol: 'file:',
      slashes: true
  });
  win.loadURL(startUrl);

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

ipcMain.on('hello-world', (e, msg) => {
  console.warn('IPCMAIN:::: ON', msg);
  e.sender.send('pong', {name: 'Hason'})

  socket.emit('device:sim', 'Look at me, remember it must be serialized');
})

socket.on('device:sim', function(msg) {
  // remember this will only warn inside of the terminal
  // set the ipc to push it out to the app
  console.warn('this works, I am electron js');
  win.webContents.send('device:sim:main', msg)
})


// Main Menu
const mainMenuTemplate = [{
  label: app.getName(),
  submenu: [{
    label: 'File',
    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
      app.quit();
    }
  }]
},
{
  label: 'Accessibility',
  submenu: [
    { role: 'startspeaking' },
    { role: 'stopspeaking' }
  ]
}];

// MacOS fix for Electron menu
if(process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

// Devtools
if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Dev',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools'},
      { role: 'togglefullscreen' }
    ]
  });
}

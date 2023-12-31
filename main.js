const {app, BrowserWindow} = require('electron')

var mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 40, 
    transparent: true,
    frame:false,
    resizable: false,
    x: 1620,
    y: 993,
    skipTaskbar: true,
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/template/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  setInterval(function(){ 
    mainWindow.setAlwaysOnTop(true, 'floating');
    mainWindow.setVisibleOnAllWorkspaces(true);
  }, 5 * 1000); // every 5 seconds make it always on top
}

app.on('ready', () => {
  console.log(process.pid);
  createWindow()
})

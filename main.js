const {app, BrowserWindow, screen, Tray, Menu, shell} = require('electron')
const path = require('path')

var mainWindow

function createWindow (display) {
  const width = 310
  const height = 40

  const { width: screenWidth, height: screenHeight } = display.workAreaSize // veya display.bounds

  const x = screenWidth - width
  const y = screenHeight - height

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width, height, 
    transparent: true,
    frame:false,
    resizable: false,
    x, y,
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

function createTray() {
  const iconPath = path.join(__dirname, 'icon.png') // icon.ico da olabilir

  tray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Github',
      click: () => { shell.openExternal('https://github.com/Ranork/Pomotro') }
    },
    { type: 'separator' },
    {
      label: 'Çıkış',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('Pomotro')
  tray.setContextMenu(contextMenu)
}


app.on('ready', () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  console.log(process.pid);
  createWindow(primaryDisplay)
  createTray()
})

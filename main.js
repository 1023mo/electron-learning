const { app, BrowserWindow, ipcMain }  = require('electron')

class appWindow extends BrowserWindow{
  constructor(config, fileLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = {...baseConfig,...config}
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new appWindow({},'./renderer/index.html')
  ipcMain.on('addMusicWindow', () => {
    const addWindow = new appWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    },'./renderer/add.html')
  })
})

const { app, BrowserWindow, ipcMain,dialog }  = require('electron')
const Store = require('electron-store')
const store = new Store()

store.set('unicorn', '🦄')

store.set('foo.bar', true)

store.delete('unicorn')

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
  ipcMain.on('openMusicFile', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }, (files) => {
      if (files) {
        event.sender.send('selectedFiles',files)
      }
    })
  })
})

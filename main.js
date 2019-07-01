const { app, BrowserWindow, ipcMain,dialog }  = require('electron')
const DataStore = require('./renderer/musicDataStore')

const myStore = new DataStore({name: 'Music Data'})
class AppWindow extends BrowserWindow{
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
  const mainWindow = new AppWindow({},'./renderer/index.html')
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('getTracks', myStore.getTracks())
  })
  ipcMain.on('addMusicWindow', () => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    },'./renderer/add.html')
  })
  ipcMain.on('delete-file', (event, id) => {
    const updateTracks = myStore.deleteTrack(id).getTracks()
    mainWindow.send('getTracks', myStore.getTracks())
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

  ipcMain.on('addMusic', (event, tracks) => {
    const updateTracks = myStore.addTracks(tracks).getTracks()
    mainWindow.send('getTracks', updateTracks)
  })
})

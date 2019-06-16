const { app, BrowserWindow, ipcMain }  = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  ipcMain.on('renderMsg', (e, arg) => {
    // e.sender.send('msg', 'It is a message from main.js')
    // 等同于
    mainWindow.send('msg', 'It is a message from main.js')
  })
})

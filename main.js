const { app, browserWindow }  = require('electron')

app.on('ready', () => {
  const mainWindow = new browserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntergration: true
    }
  })
  mainWindow.loadFile('index.html')
})

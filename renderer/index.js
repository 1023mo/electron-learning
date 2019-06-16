const { ipcRenderer } = require('electron')

document.getElementById('addMusicBtn').addEventListener('click', () => {
  ipcRenderer.send('addMusicWindow')
})
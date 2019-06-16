const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

$('addMusicBtn').addEventListener('click', () => {
  ipcRenderer.send('addMusicWindow')
})
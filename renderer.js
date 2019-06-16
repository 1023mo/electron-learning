const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('renderMsg', 'electron')
  ipcRenderer.on('msg', (e, arg) => {
    document.getElementById('content').innerHTML = arg
  })
})
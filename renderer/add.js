const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')
let musicFilesPath = []

$('selectMusic').addEventListener('click', () => {
  ipcRenderer.send('openMusicFile')
})

$('addMusic').addEventListener('click', () => {
  if (!musicFilesPath) return
  ipcRenderer.send('addMusic', musicFilesPath)
})

const renderListHTML = (paths) => {
  const musicList = $('musicList')
  const MusicItemsHTML = paths.reduce((item, index) => {
    item += `<li class="list-group-item">${path.basename(index)}</li>`
    return item
  }, '')
  musicList.innerHTML = `<ul class="list-group">${MusicItemsHTML}</ul>`
}
ipcRenderer.on('selectedFiles', (event, path) => {
  if (Array.isArray(path)) {
    renderListHTML(path)
    musicFilesPath = path
  }
})
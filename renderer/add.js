const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')

$('selectMusic').addEventListener('click', () => {
  ipcRenderer.send('openMusicFile')
})

const renderListHTML = (paths) => {
  const musicList = $('musicList')
  const MusicItemsHTML = paths.reduce((item, index) => {
    console.log(item,index);
    item += `<li class="list-group-item">${path.basename(index)}</li>`
    return item
  }, '')
  musicList.innerHTML = `<ul class="list-group">${MusicItemsHTML}</ul>`
}
ipcRenderer.on('selectedFiles', (event, path) => {
  if (Array.isArray(path)) {
    renderListHTML(path)
  }
})
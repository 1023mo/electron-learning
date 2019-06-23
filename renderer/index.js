const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

$('addMusicBtn').addEventListener('click', () => {
  ipcRenderer.send('addMusicWindow')
})

const renderListHTML = (tracks) => {
  const tracksList = $('tracksList')
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `<li class="music-track list-group-item d-flex justify-content-between align-item">
      <div class="col-10">
        <i class="fas fa-music mr-2"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="fas fa-play mr-2"></i>
        <i class="fas fa-trash-alt"></i>
      </div>
    </li>`
    return html
  }, '')
  const emptyTrackHTML = '<div class="alert alert-primary"></div>'
  tracksList.innerHTML = tracks.length ? `<ul class="list-group>${tracksListHTML}</ul>` : emptyTrackHTML
}
ipcRenderer.on('getTracks', (event,tracks) => {
  renderListHTML(tracks)
})
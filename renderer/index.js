const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
let musicAudio = new Audio()
let allTracks
let currentTrack

$('addMusicBtn').addEventListener('click', () => {
  ipcRenderer.send('addMusicWindow')
})

const renderListHTML = (tracks) => {
  const tracksList = $('tracksList')
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `<li class="music-track list-group-item d-flex justify-content-between align-item">
      <div class="col-10">
        <i class="fas fa-music mr-2 text-secondary"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="fas fa-play mr-3" data-id="${track.id}"></i>
        <i class="fas fa-trash-alt" data-id="${track.id}"></i>
      </div>
    </li>`
    return html
  }, '')
  const emptyTrackHTML = '<div class="alert alert-primary"></div>'
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}
ipcRenderer.on('getTracks', (event,tracks) => {
  allTracks = tracks
  renderListHTML(tracks)
})

$('tracksList').addEventListener('click', event => {
  event.preventDefault()
  const { dataset, classList } = event.target
  const id = dataset && dataset.id
  if (id && classList.contains('fa-play')) {
    currentTrack = allTracks.find(track => track.id === id)
    musicAudio.src = currentTrack.path
    musicAudio.play()
    classList.replace('fa-play', 'fa-pause')
  }
})
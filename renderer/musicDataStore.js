const Store = require('electron-store')
const uuid = require('uuid/v4')
const path = require('path')

class DataStore extends Store {
  constructor(settings) {
    super(settings)
    this.tracks = this.get('tracks') || []
  }
  saveTracks () {
    this.set('tracks', this.tracks)
    return this
  }
  getTracks () {
    return this.get('tracks') || []
  }
  addTracks (tracks) {
    const tracksItems = tracks.map(track => {
      return {
        id: uuid(),
        path: track,
        fileName: path.basename(track)
      }
    }).filter(track => {
      const currentTracksPath = this.getTracks().map(track => track.path)
      return currentTracksPath.indexOf(track.path) < 0
    })
    this.tracks = [ ...this.tracks, ...tracksItems ]
    return this.saveTracks()
  }
}

module.exports = DataStore

import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumsService {

  async getAllAlbums() {
    const res = await api.get('api/albums')
    const albums = res.data.map(a => new Album(a))
    AppState.albums = albums
  }

  async getOneAlbumById(albumId) {
    AppState.album = null
    const res = await api.get('api/albums/' + albumId)
    AppState.album = new Album(res.data)
  }

  async createAlbum(formData) {
    const res = await api.post('api/albums', formData)
    logger.log('creating album', res.data)

    // NOTE this commented out because we are doing the push from the socketsService now  
    // AppState.albums.push(new Album(res.data))
  }

  async archiveAlbum(albumId) {
    const res = await api.delete('api/albums/' + albumId)
    logger.log('archiving album', res.data)
    AppState.album = new Album(res.data)
  }

}


export const albumsService = new AlbumsService()

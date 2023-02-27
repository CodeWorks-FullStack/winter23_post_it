import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
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


}


export const albumsService = new AlbumsService()

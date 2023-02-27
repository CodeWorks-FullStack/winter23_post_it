import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class AlbumsService {
  async getOneAlbumById(albumId) {

    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')

    if (!album) {
      throw new BadRequest('Invalid Album Id')
    }

    return album

  }
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }

  async createAlbum(albumData) {

    const album = await dbContext.Albums.create(albumData)

    await album.populate('creator', 'name picture')

    return album

  }




}

export const albumsService = new AlbumsService()

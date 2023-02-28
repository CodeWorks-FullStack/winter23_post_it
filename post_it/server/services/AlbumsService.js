import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class AlbumsService {
  async archiveAlbum(albumId, requestorId) {

    const album = await this.getOneAlbumById(albumId)

    if (album.creatorId.toString() != requestorId) {
      throw new Forbidden('You are not allowed to perform this action... it is not your album to close')
    }

    album.archived = true
    await album.save()
    return album
  }


  async getOneAlbumById(albumId) {

    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')

    if (!album) {
      throw new BadRequest('Invalid Album Id')
    }

    return album

  }

  async getAllAlbums() {
    const albums = await dbContext.Albums.find()
      .populate('creator', 'name picture')
      .populate('albumMemberCount')
    return albums
  }

  async createAlbum(albumData) {

    const album = await dbContext.Albums.create(albumData)

    await album.populate('creator albumMemberCount', 'name picture')

    return album

  }




}

export const albumsService = new AlbumsService()

import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class AlbumMembersService {
  async getAlbumMembersByAlbumId(albumId) {
    const albumMembers = await dbContext.AlbumMembers.find({ albumId })
      .populate('profile', 'name picture')
    return albumMembers
  }
  async createAlbumMember(albumMemberData) {
    const album = await albumsService.getOneAlbumById(albumMemberData.albumId)

    if (album.archived) {
      throw new Forbidden('Album is archived, dirtbag 🔒')
    }

    const albumMember = await dbContext.AlbumMembers.create(albumMemberData)
    return albumMember
  }

}

export const albumMembersService = new AlbumMembersService()
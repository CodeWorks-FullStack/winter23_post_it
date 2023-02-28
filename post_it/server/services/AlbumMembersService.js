import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class AlbumMembersService {
  async destroyAlbumMemberById(albumMemberId, requestorId) {
    const albumMember = await dbContext.AlbumMembers.findById(albumMemberId)
    if (!albumMember) {
      throw new BadRequest('Invalid Id, nerd 🤓')
    }

    if (albumMember.accountId.toString() !== requestorId) {
      throw new Forbidden("I'm onto you, nerd 🤓")
    }

    await albumMember.remove()
    return 'No longer a collaborator, nerd! 🤓'
  }
  async getAlbumsThatIAmACollaboratorOn(accountId) {
    // NOTE nested populate. It's complicated https://dev.to/rajeshroyal/how-to-populate-nested-document-in-mongodb-3a91
    const albums = await dbContext.AlbumMembers.find({ accountId })
      .populate({
        path: 'album',
        populate: {
          path: 'creator albumMemberCount',
          select: 'name picture'
        }
      })
    return albums
  }
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
    await albumMember.populate('profile', 'name picture')
    await albumMember.populate({
      path: 'album',
      populate: {
        path: 'creator albumMemberCount',
        select: 'name picture'
      }
    })
    return albumMember
  }

}

export const albumMembersService = new AlbumMembersService()
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { albumMembersService } from "../services/AlbumMembersService.js";
import { socketProvider } from "../SocketProvider.js";

export class AlbumMembersController extends BaseController {
  constructor () {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbumMember)
      .delete('/:collaboratorId', this.destroyAlbumMemberById)
  }

  async createAlbumMember(req, res, next) {
    try {
      const albumMemberData = req.body
      albumMemberData.accountId = req.userInfo.id
      const albumMember = await albumMembersService.createAlbumMember(albumMemberData)

      // @ts-ignore
      socketProvider.messageUser(albumMember.album.creatorId.toString(), 'toUser:createdCollab', albumMember)

      return res.send(albumMember)
    } catch (error) {
      next(error)
    }
  }

  async destroyAlbumMemberById(req, res, next) {
    try {
      const albumMemberId = req.params.collaboratorId
      const requestorId = req.userInfo.id
      const message = await albumMembersService.destroyAlbumMemberById(albumMemberId, requestorId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
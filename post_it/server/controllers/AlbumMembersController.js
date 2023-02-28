import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { albumMembersService } from "../services/AlbumMembersService.js";

export class AlbumMembersController extends BaseController {
  constructor () {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbumMember)
  }
  async createAlbumMember(req, res, next) {
    try {
      const albumMemberData = req.body
      albumMemberData.accountId = req.userInfo.id
      const albumMember = await albumMembersService.createAlbumMember(albumMemberData)
      return res.send(albumMember)
    } catch (error) {
      next(error)
    }
  }
}
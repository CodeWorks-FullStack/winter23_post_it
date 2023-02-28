import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { albumMembersService } from '../services/AlbumMembersService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getAlbumsThatIAmACollaboratorOn)
  }


  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumsThatIAmACollaboratorOn(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const albums = await albumMembersService.getAlbumsThatIAmACollaboratorOn(accountId)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

}
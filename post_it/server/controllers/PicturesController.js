import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import { socketProvider } from "../SocketProvider.js";
import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController {
  constructor () {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)

  }
  async createPicture(req, res, next) {
    try {
      const pictureData = req.body
      pictureData.creatorId = req.userInfo.id
      const picture = await picturesService.createPicture(pictureData)

      // NOTE you have take in the objectId that comes from mongoDB, the magic string to talk to the client, and the object itself
      socketProvider.messageRoom(picture.albumId.toString(), 'created:picture', picture)

      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}
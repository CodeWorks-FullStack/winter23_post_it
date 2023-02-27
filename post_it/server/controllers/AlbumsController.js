import { Auth0Provider } from "@bcwdev/auth0provider"
import { albumsService } from "../services/AlbumsService.js"
import BaseController from "../utils/BaseController.js"

export class AlbumsController extends BaseController {

  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getOneAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
  }
  async getOneAlbumById(req, res, next) {
    try {

      const albumId = req.params.albumId
      const album = await albumsService.getOneAlbumById(albumId)
      return res.send(album)

    } catch (error) {
      next(error)
    }
  }

  async getAllAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(req, res, next) {

    try {
      const albumData = req.body
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE!!!
      // You have to attach the creatorId to the thing that you want to create
      albumData.creatorId = req.userInfo.id // this makes me happy 😁

      const album = await albumsService.createAlbum(albumData)
      return res.send(album)


    } catch (error) {
      next(error)
    }

  }

}

import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService.js";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";
import { socketProvider } from "../SocketProvider.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor () {
    super("api/albums");
    this.router

      .get("", this.getAllAlbums)
      .get("/:albumId", this.getOneAlbumById)
      .get("/:albumId/pictures", this.getPicturesInAlbum)
      .get("/:albumId/collaborators", this.getAlbumMembersByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createAlbum)
      .delete("/:albumId", this.archiveAlbum)
      .use(Auth0Provider.hasRoles("admin"))
      .delete("/:albumId/pictures", this.deleteAllPictures);
  }

  async getOneAlbumById(req, res, next) {
    try {
      const albumId = req.params.albumId;
      const album = await albumsService.getOneAlbumById(albumId);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  async getAllAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAllAlbums();
      res.send(albums);
    } catch (error) {
      next(error);
    }
  }

  async getPicturesInAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId;
      const pictures = await picturesService.getPicturesInAlbum(albumId);
      return res.send(pictures);
    } catch (error) {
      next(error);
    }
  }

  async getAlbumMembersByAlbumId(req, res, next) {
    try {
      const albumId = req.params.albumId;
      const albumMembers = await albumMembersService.getAlbumMembersByAlbumId(
        albumId
      );
      return res.send(albumMembers);
    } catch (error) {
      next(error);
    }
  }

  async createAlbum(req, res, next) {
    try {
      const albumData = req.body;
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE!!!
      // You have to attach the creatorId to the thing that you want to create
      albumData.creatorId = req.userInfo.id; // this makes me happy 😁

      const album = await albumsService.createAlbum(albumData);
      // NOTE bringing in the socketProvider .message will send everyone on the website a message do this after you get the data back from the service
      // NOTE the magic string needs to match what the listener is on the client
      // NOTE the object is going back to the client because we need the data from whoever just created this to be sent to everyone connected to the socket
      socketProvider.message("created:album", album);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  async archiveAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId;
      const userInfo = req.userInfo;
      const album = await albumsService.archiveAlbum(albumId, userInfo);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  // AUTH

  async deleteAllPictures(req, res, next) {
    try {
      let albumId = req.params.albumId;
      const message = await picturesService.deleteAllPictures(albumId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}

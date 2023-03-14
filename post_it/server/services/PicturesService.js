import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { albumsService } from "./AlbumsService.js";

class PicturesService {
  async getPicturesInAlbum(albumId) {
    // pictures.filter(p => p.albumId == albumId)
    // const pictures = await dbContext.Pictures.find({ albumId: albumId })
    const pictures = await dbContext.Pictures.find({ albumId }).populate(
      "creator",
      "name picture"
    );
    return pictures;
  }

  async createPicture(pictureData) {
    // Get album
    const album = await albumsService.getOneAlbumById(pictureData.albumId);

    // Check if it is archived and throw an error
    if (album.archived) {
      throw new Forbidden("Album is archived 🔒");
    }

    const picture = await dbContext.Pictures.create(pictureData);
    // NOTE you only have to drop a line to populate on creates!
    await picture.populate("creator", "name picture");
    return picture;
  }

  // STUB ADMIN DELETE ALL PICTURES \\

  async deleteAllPictures(albumId) {
    await dbContext.Pictures.deleteMany({ albumId });
    return `Successfully deleted all dem pictures.`;
  }
}

export const picturesService = new PicturesService();

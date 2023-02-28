import { dbContext } from "../db/DbContext.js"

class PicturesService {
  async getPicturesInAlbum(albumId) {
    // pictures.filter(p => p.albumId == albumId)
    // const pictures = await dbContext.Pictures.find({ albumId: albumId })
    const pictures = await dbContext.Pictures.find({ albumId }).populate('creator', 'name picture')
    return pictures
  }

  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    // NOTE you only have to drop a line to populate on creates!
    await picture.populate('creator', 'name picture')
    return picture
  }

}

export const picturesService = new PicturesService()
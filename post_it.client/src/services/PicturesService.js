import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    AppState.pictures = []
    const res = await api.get('api/albums/' + albumId + '/pictures')
    logger.log('getting pictures', res.data)
    AppState.pictures = res.data.map(p => new Picture(p))
  }

  async createPicture(pictureData) {
    const res = await api.post('api/pictures', pictureData)
    logger.log('posting picture', res.data)
    // AppState.pictures.push(new Picture(res.data))
  }
}

export const picturesService = new PicturesService()
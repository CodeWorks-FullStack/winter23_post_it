import { AppState } from "../AppState.js"
import { Collab } from "../models/Collab.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CollaboratorsService {

  async getCollaboratorsByAlbumId(albumId) {
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    logger.log('get collabs', res.data)
    AppState.collabs = res.data.map(c => new Collab(c))
  }

  async createCollaboration(albumData) {
    const res = await api.post('api/collaborators', albumData)
    logger.log('becoming collab', res.data)
    AppState.collabs.push(new Collab(res.data))
  }

  async removeCollaboration(collaboratorId) {
    const res = await api.delete(`api/collaborators/${collaboratorId}`)
    logger.log('removing collab', res.data)
    const collabIndex = AppState.collabs.findIndex(c => c.collaboratorId == collaboratorId)
    if (collabIndex !== -1) {
      AppState.collabs.splice(collabIndex, 1)
    }
  }
}

export const collaboratorsService = new CollaboratorsService()
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('created:album', this.createdAlbum)

  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
createdAlbum(payload){
    logger.log('[CREATED ALBUM PAYLOAD]', payload)

    // NOTE we have to do either one of these! --> 


    // NOTE we can push directly from the handler only if we comment out the push in the service
    AppState.albums.push(new Album(payload))
    
    Pop.toast(`${payload.name} album was just created!`)

    // NOTE check to see if no one is logged in OR if the logged in user is not who just created the object
    // NOTE we can do this if the push still exists in the service
    // if(!AppState.account.id || AppState.account.id != payload.creatorId){
    //   AppState.albums.push(new Album(payload))
    // }
  }
 
}

export const socketService = new SocketService()

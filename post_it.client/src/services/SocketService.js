import { AppState } from '../AppState.js'
import { Album } from '../models/Album.js'
import { Picture } from '../models/Picture.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('created:album', this.createdAlbum)
      .on('joined:room', this.joinedRoom)
      .on('left:room', this.leftRoom)
      .on('created:picture', this.createdPicture)
      .on('toUser:createdCollab', this.createdCollab)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }


  createdAlbum(payload){
    try {
      logger.log('[CREATED ALBUM PAYLOAD]', payload)

      AppState.albums.push(new Album(payload))

      Pop.toast(`${payload.title} album was just created!`)


      // if(AppState.account.id || AppState.account.id != payload.creatorId){
      //   AppState.albums.push(new Album(payload))
      // }


    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  joinedRoom(payload){
    try {
      logger.log('[JOINING ROOM PAYLOAD]', payload)

      if(payload && payload.id != AppState.account.id){
        Pop.toast(`${payload.name} has joined the room!`)
      }

    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  leftRoom(payload){
    try {
      logger.log('[LEFT ROOM PAYLOAD]', payload)

      if(payload){
        Pop.toast(`${payload.name} has left the room!`)
      }

    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  createdPicture(payload){

    try {
      logger.log('[CREATED PICTURE PAYLOAD]', payload)

      AppState.pictures.push(new Picture(payload))

      if(payload.creatorId != AppState.account.id){
        Pop.toast(`${payload.creator.name} just added a picture!`)
      }

    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }


  createdCollab(payload){
    try {
      logger.log('[CREATED COLLAB PAYLOAD]', payload)

      Pop.toast(`${payload.profile.name} has collabed on ${payload.album.title}!`)

    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

}

export const socketService = new SocketService()

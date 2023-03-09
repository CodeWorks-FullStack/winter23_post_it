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
  // NOTE put this in a try catch just in case for error handling 
  try {
    
    logger.log('[CREATED ALBUM PAYLOAD]', payload)

    // NOTE we have to do either one of these! --> 


    // NOTE we can push directly from the handler only if we comment out the push in the service
    AppState.albums.push(new Album(payload))
    
    Pop.toast(`${payload.title} album was just created!`)

    // NOTE check to see if no one is logged in OR if the logged in user is not who just created the object
    // NOTE we can do this if the push still exists in the service
    // if(!AppState.account.id || AppState.account.id != payload.creatorId){
    //   AppState.albums.push(new Album(payload))
    // }
  } catch (error) {
    Pop.error(error.message)
  }
  }

  joinedRoom(payload){
    try {
      // NOTE notify the room if someone has entered the room and its not you (this should prevent you from seeing the message when you have entered the room, no need to tell yourself that you just entered)
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
      // NOTE you are out of the room so you (the user) will not see this message, but everyone that is still in the room will see the message
      if(payload){
        Pop.toast(`${payload.name} has left the room!`)
      }
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  // TODO maybe have the picture show up in the pop.toast
  createdPicture(payload){
    try {
      let picture = new Picture(payload)
      AppState.pictures.push(picture)
      // NOTE an if statement just to check that the user who is posting the image does not get the notification that they just posted the image
      if(picture.creatorId != AppState.account.id){
        Pop.toast(`${picture.creator.name} has just posted a new picture!`)
      }
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  createdCollab(payload){
    try {
      // NOTE you just have to notify/send a message the user(you) when someone collabs
      Pop.toast(`
      <br>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <p>${payload.profile.name} just collaborated on ${payload.album.title}</p>
          </div>
        </div>
      </div>
      `, null, payload.profile.picture)
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }
}

export const socketService = new SocketService()

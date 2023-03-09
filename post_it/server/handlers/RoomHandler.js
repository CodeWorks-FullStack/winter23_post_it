import { socketProvider } from '../SocketProvider.js'
import { SocketHandler } from '../utils/SocketHandler'

export class RoomHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('join:room', this.joinRoom)
      .on('leave:room', this.leaveRoom)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }

  // NOTE to join a room from the backend
  joinRoom(payload){
    this.socket.join(payload.roomName)
    // NOTE this is emitting back to our client that a user has joined this particular room
    socketProvider.messageRoom(payload.roomName, 'joined:room', this.user)
  }

  leaveRoom(payload){
    // NOTE this is kicking the user off the socket when the leave the room
    this.socket.leave(payload.roomName)
    socketProvider.messageRoom(payload.roomName, 'left:room', this.user)
  }

}


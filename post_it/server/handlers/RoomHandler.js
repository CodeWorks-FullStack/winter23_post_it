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

  joinRoom(payload){
    this.socket.join(payload.roomName)

    socketProvider.messageRoom(payload.roomName, 'joined:room', this.user)
  }

  leaveRoom(payload){
    this.socket.leave(payload.roomName)

    socketProvider.messageRoom(payload.roomName, 'left:room', this.user)
  }
}

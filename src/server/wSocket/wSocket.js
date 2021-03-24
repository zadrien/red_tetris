import io from 'socket.io'
import debug from 'debug'
import RegisteredPlayer from '../player/playerController'
import RoomAPI from '../rooms/roomsAPI'

const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

const rPlayers = new RegisteredPlayer()

function wSocket(server) {
  this.wServer = io(server, {
    pingTimeout: 25000,
    pingInterval: 20000
  })
  this.api = new RoomAPI(this.wServer)

  this.init()
}

wSocket.prototype.init = function () {
  const RoomsEvents = new RoomAPI(this.wServer)

  this.wServer.on('connection', function(socket) {
    loginfo(`someone is connected [${socket.id}]`, )
    socket.on('login', function (payload) {
      try {
        const player = rPlayers.login(socket, payload)
        player.Notify('login', { name: player.name })
        if (!player) {
          console.log('User not created')
        }
        loginfo(`A new player has joined the platform ${player.name}`)
        socket.on('FETCH', (data) => RoomsEvents.fetch(player, data))
        socket.on('JOIN', (data) => RoomsEvents.join(player, data))
        socket.on('START', (data) => RoomsEvents.start(player, data))
        socket.on('LEAVE', (data) => RoomsEvents.leave(player, data))
      } catch (err) {
        logerror(err)
        socket.emit('login', { err: err.message })
      }
    })
    socket.on('disconnect', function () {
      rPlayers.logout(socket.id)
      loginfo('user is disconnected! [', socket.id, ']')

    })
  })
}

wSocket.prototype.close = function() {
  console.log('closeeeee')
  this.api.close()
  this.wServer.close()
}

export default wSocket
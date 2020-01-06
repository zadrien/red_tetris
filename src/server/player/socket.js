export function Socket(io) {
	this.io = io
}

Socket.prototype.connect = function() {
	this.io.on('connect', function(socket) {
		socket.on('ping', function (data) {
			socket.emit("pong","pong")
			this.io.emit("pong", "pong")
		})

		socket.on("test", (data) => {
			console.log("WOOORKED")
			socket.emit("test", "worked")
		})

		socket.on("DISPLAY", (data) => {
			socket.emit("DISPLAY", data)
		})
		socket.on("disconnected", function() {
			console.log("disconnected")
		})
	})
}

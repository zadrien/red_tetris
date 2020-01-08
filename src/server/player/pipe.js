const Stream = require('stream')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

function Emitter() {
	this.emitter = new MyEmitter()
}



function MyPipe() {
	this.readableStream = new Stream.Readable()

	this.readableStream._read = (size) => {}
}



MyPipe.prototype.push = function (event, data) {
	var event = {
		type: event,
		data
	}
	this.readableStream.push(JSON.stringify(event))
}

MyPipe.prototype.on = function (multiplexer) {	
	this.readableStream.on('data', (data) => {
		var event = JSON.parse(data)
		
		multiplexer(event)
	})
}


function multiplexer(event) {
	switch (event.type) {
	case "ping":
		console.log(event.data)
	}
}

var pipe = new MyPipe()

pipe.on(multiplexer)

pipe.push("ping", "pong")

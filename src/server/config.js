const mongoose = require('mongoose');
const Rooms = require('./rooms/roomsController')

export async function connectToDatabase(URI) {
	try {
		await mongoose.connect(URI, { urlNewUrlParser: true})
		await mongoose.set('useFindAndModify', false)
	} catch (err) {
		throw err
	}
}

export async function closeDatabase() {
	mongoose.connection.close()
}

export async function initConfig(io, params) {
	try {
		await connectToDatabase(params.server.db)
		await Rooms.restoreRooms(io)
	} catch (err) {
		io.close()
		process.exit(1)
	}
}

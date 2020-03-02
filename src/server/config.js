const mongoose = require('mongoose');

export async function connectToDatabase(URI) {
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		
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
	} catch (err) {
		io.close()
		process.exit(1)
	}
}

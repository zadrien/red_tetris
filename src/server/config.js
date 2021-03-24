const mongoose = require('mongoose');
const path = require('path')
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: ''})
} else {
  require('dotenv').config({ path: path.join(path.dirname(path.dirname(__dirname)), '.env.development')})

}

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

export async function initConfig(io) {
	try {
		await connectToDatabase(process.env.MONGO_HOST)
	} catch (err) {
		io.close()
		process.exit(1)
	}
}

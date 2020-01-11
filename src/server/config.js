const mongoose = require('mongoose');

export async function connectToDatabase(uri) {
    try {
		await mongoose.connect(uri, { urlNewUrlParser: true });
		await mongoose.set('useFindAndModify', false);
    } catch (err) {
		Promise.reject(err)
    }
}

export async function closeDatabase() {
	try {
		await mongoose.connection.close()
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}



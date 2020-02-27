const mongoose = require('mongoose');

const Schema = mongoose.Schema

const roomSchema = new Schema({
    id: String,
    name: String,
	mode: String,
	nbrUser: Number,
    isOpen: Boolean
}, { timestamps: { createdAt: 'created_at' }});


roomSchema.statics = {
    async create(newRoom) {
		try {
			const duplicate = await this.findOne({ id: newRoom.id }).exec()
			if (duplicate)
				return undefined
			const room = new roomsDAL(newRoom)
			const p = await room.save()
			return p
		} catch (err) {
			Promise.reject(err)
		}
    },

    async readOne(id) {
		try {
			const room = await this.findOne({ id: id }).exec()
			if (!room)
				return new Error("room not found")
			return room.toObject();
		} catch(err) {
			return Promise.reject(err);
		}
    },
    
    async read(query, fields, skip, limit) {
		try {
			const rooms = await this.find(query, fields).skip(skip === undefined ? 0 : skip).limit(limit === undefined ? 0 : limit).sort({"created_at": '1'}).exec()
			if (!rooms.length) {
				return []
			}
			return rooms.map(room => room.toObject())
		} catch(err) {
			Promise.reject(err)
		}
    },

    async update(id, roomUpdate) {
		try {
			let res = await this.updateOne({id: id}, roomUpdate)
			return res.nModified
		} catch (err) {
			return Promise.reject(err)
		}
    },

	async delete(id) {
		try {
			var p = await this.deleteOne({id: id}).exec()
			return p.deletedCount
		} catch (err) {
			Promise.reject(err)
		}
	}
}

const roomsDAL = mongoose.model("Rooms", roomSchema);

module.exports = {
    roomsDAL
}

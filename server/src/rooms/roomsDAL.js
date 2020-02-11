const mongoose = require('mongoose');

const Schema = mongoose.Schema

const roomSchema = new Schema({
    id: String,
    name: String,
    mode: String,
    open: Boolean
}, {timestamps: { createdAt: 'created_at'}});


roomSchema.statics = {
    async create(newRoom) {
		try {
			const duplicate = this.findOne({ id: newRoom.id })
			if (!duplicate)
				Promise.reject(new Error("room already exist"))
			var room = new Rooms(newRoom)
			const p = await room.save()
			return p
		} catch (err) {
			return Promise.reject(err)
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
			const rooms = await this.find(query, fields).skip(skip).limit(limit).sort({timestamps: 'asc'}).exec();
			if (!rooms.length) {
				return []
			}
			return rooms.map(room => room.toObject())
		} catch(err) {
			return Promise.reject(err)
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

	async deleteRoom(id) {
		try {
			var p = await this.deleteOne({id: id}).exec()
			return p.deletedCount
		} catch (err) {
			Promise.reject(err)
		}
	}
}

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = {
    Rooms
}

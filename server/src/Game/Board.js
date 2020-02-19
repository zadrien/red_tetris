import utils from './utils'

function Board(emitter, mode) {
	this.event = emitter
	this.map = utils.buildMap()
	this.piece = undefined
	this.x = 0
	this.y = 0
	this.mode = mode
	this.malus = 0
	this.itr = 0
	this.nbr = 0
}

Board.prototype.start = function () {
	function logic() {
		if (this.down() === false) {
			if(this.verify() !== 0)
				this.event.emit('mallus')
			this.event.emit('add', this.nbr)
		}
		if (this.mode === false)
			this.event.emit('display', this.map)
	}
	const start = logic.bind(this)

	this.itr = setInterval(start, 900)
	return this.itr
}

Board.prototype.stop = function () {
	if (this.itr === 0)
		return false
	clearInterval(this.itr)
	this.itr = undefined
	this.event.emit("end")
}

Board.prototype.get = function () {
	return utils.clone(this.map)
}

Board.prototype.add = function (piece) {
	if (this.piece)
		return false
	this.piece = utils.clone(piece)
	this.x = Math.round((10 - this.piece.shape[0].length) / 2);
	this.y = 0
	let cpy = utils.clone(this.map)

	if (!utils.merge(cpy, this.piece, this.x, this.y)) {
		this.stop()
		return false
	}
	this.map = cpy
	this.event.emit("display", this.map)
	this.nbr++
	return true
}

Board.prototype.setMalus = function () {
	this.malus++
	let copy = utils.clone(this.map)
	if (this.piece)
		utils.remove(copy, this.piece, this.x, this.y)
	
	let lineToRemove = copy.findIndex(el => el.find(v => v === '.') !== undefined)
	if (lineToRemove === -1)
		return false
	utils.addMallus(copy, lineToRemove, 20 - this.malus)
	if (this.piece) {
		let arr = utils.clone(copy)
		utils.merge(arr, this.piece, this.x, this.y-1)
		this.map = !utils.merge(copy, this.piece, this.x, this.y) ? arr : copy
	} else
		this.map = copy
	if (this.mode === true && this.piece) {
		copy = utils.clone(this.map)
		utils.remove(this.map, this.piece, this.x, this.y) }
		this.event.emit('display', this.map)
	// }
	return true
}

// Board.prototype.setMalus = function () {
// 	this.malus++
// 	this.mutex = true
// 	let copy = utils.clone(this.map)
// 	if (this.piece)
// 		utils.remove(copy, this.piece, this.x, this.y)		
	
// 	if (copy[0].find(c => c !== '.'))
// 		return false
// 	utils.addMallus(copy, 20 - this.malus)
// 	if (this.piece) {
// 		let arr = utils.clone(copy)

// 		utils.merge(arr, this.piece, this.x, this.y -1)
// 		if (!utils.merge(arr, this.piece, this.x, this.y))
// 			this.map = arr
// 		else
// 			this.map = copy
// 		// this.map = !utils.merge(arr, this.piece, this.x, this.y) ? arr : copy
// 	} else {
// 		this.map = copy
// 	}
// 	if (this.mode === true && this.piece) {
// 		copy = utils.clone(this.map)
// 		utils.remove(copy, this.piece, this.x, this.y)
// 		this.event.emit("display", copy)
// 	} else
// 		this.event.emit("display", this.map)
// 	this.mutex = false
// 	return true
// }

Board.prototype.place = function () {
	if (!this.piece)
		return false
	let copy = utils.clone(this.map)
	utils.remove(copy, this.piece, this.x, this.y)
	while(utils.merge(copy, this.piece, this.x, this.y + 1)) {
		this.y++
		this.map = utils.clone(copy)
		utils.remove(copy, this.piece, this.x, this.y)
	}
	this.event.emit("display", this.map)
	delete this.piece
	return true
}

Board.prototype.down = function () {
	if (!this.piece)
		return false
	let copy = utils.clone(this.map)
	if (utils.remove(copy, this.piece, this.x, this.y)) {
		if (utils.merge(copy, this.piece, this.x, this.y + 1)) {
			this.y++
			this.map = copy
			if (this.mode == true) {
				copy = utils.clone(this.map)
				utils.remove(copy, this.piece, this.x, this.y)
				this.event.emit("display", copy)
			} else {
				this.event.emit("display", this.map)
			}
			this.isMovingDown = false
			return true
		} else {
			delete this.piece
		}
	}
	return false
}

Board.prototype.left = function () {
	if (!this.piece)
		return false
	let copy = utils.clone(this.map)
	if (utils.remove(copy, this.piece, this.x, this.y))
		if (!utils.merge(copy, this.piece, this.x - 1, this.y))
			return false
	this.x--
	this.map = copy
	if (this.mode == true) {
		copy = utils.clone(this.map)
		utils.remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
	return true
}

Board.prototype.right = function () {
	if (!this.piece)
		return false
	let copy = utils.clone(this.map)
	if (utils.remove(copy, this.piece, this.x, this.y))
		if (!utils.merge(copy, this.piece, this.x + 1, this.y))
			return false
	this.x++
	this.map = copy
	if (this.mode === true) {
		copy = utils.clone(this.map)
		utils.remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
	return true
}

Board.prototype.rotate = function () {
	if (!this.piece)
		return false
	let copy = utils.clone(this.map)
	var piece = utils.clone(this.piece)		
	if (utils.remove(copy, piece, this.x, this.y)) {
		utils.rotateRight(piece)
		if (!utils.merge(copy, piece, this.x, this.y))
			return false
	}
	this.map = copy
	this.piece = piece
	if (this.mode == true) {
		copy = utils.clone(this.map)
		utils.remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
	return true
}

Board.prototype.verify = function () {
	let copy = utils.clone(this.map)
	var r = utils.isFull(this.map, this.map.length - this.malus, el => el === '.')
	if (r) {
		for (var i = r.length - 1; i >= 0; i--) {
			copy.splice(r[i], 1)
			copy.splice(0, 0, [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ])
		}
		this.map = copy
		this.event.emit("display", this.map)
		return r.length
	}
	return 0
}

export default Board

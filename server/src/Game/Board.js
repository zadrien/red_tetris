import utils from './utils'

function Board(emitter, mode) {
	this.event = emitter
	this.map = utils.buildMap()
	this.piece = undefined
	this.x = 0
	this.y = 0
	this.mode = mode
	this.lock = false
	this.malus = 0
	this.itr = 0
	this.nbr = 0
}

Board.prototype.start = function () {
	var fn = function () {
		if (this.down() === false) {
			if(this.verify() !== 0)
				this.event.emit('mallus')
			this.event.emit('add', this.nbr)
		}
		if (this.mode === false)
			this.event.emit('display', this.map)
	}.bind(this)

	this.itr = setInterval(fn, 900)
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
	if (this.piece) {
		console.log("BEGIIIN")
		return false
	}
	this.piece = utils.clone(piece)
	this.x = Math.round((10 - this.piece.shape[0].length) / 2);
	this.y = 0
	let cpy = utils.clone(this.map)

	if (!utils.merge(cpy, this.piece, this.x, this.y)) {
		console.log("LAAA")
		return false
	}
	this.map = cpy
	this.event.emit("display", this.map)
	this.nbr++
	return true
}

Board.prototype.setMalus = function () {
	this.malus++
	var copy = utils.clone(this.map)
	if (this.piece)
		utils.remove(copy, this.piece, this.x, this.y)
	
	if (copy[0].find(c => c !== '.'))
		return false
	utils.addMallus(copy, 20 - this.malus)
	if (this.piece) {
		var finalMap = utils.clone(copy)
		this.map = !utils.merge(copy, this.piece, this.x, this.y) ? finalMap : copy
	} else {
		this.map = copy
	}
	if (this.mode === true && this.piece) {
		copy = utils.clone(this.map)
		utils.remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
	return true
}

Board.prototype.place = function () {
	if (!this.piece)
		return false
	var copy = utils.clone(this.map)
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
	var copy = utils.clone(this.map)
	if (utils.remove(copy, this.piece, this.x, this.y))
		if (!utils.merge(copy, this.piece, this.x, this.y+1)) {
			this.piece = undefined
			return false
		}
	this.y++
	this.map = copy
	if (this.mode == true) {
		copy = utils.clone(this.map)
		utils.remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
	return true
}

Board.prototype.left = function () {
	if (!this.piece)
		return false
	var copy = utils.clone(this.map)
	if (utils.remove(copy, this.piece, this.x, this.y))
		if (!utils.merge(copy, this.piece, this.x - 1, this.y)) {
			console.log("LOL")
			return false
		}
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
	var copy = utils.clone(this.map)
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
	var copy = utils.clone(this.map)
	var piece = utils.clone(this.piece)		
	if (utils.remove(copy, piece, this.x, this.y)) {
		utils.rotateRight(piece)
		console.log(piece)
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
	var copy = utils.clone(this.map)
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

import {
	newMap,
	copyMap,
	showMap,
	remove,
	placeable,
	fillLine,
	fullLine,
	rotateClockwise,
	rotateUndo
} from './helpers'

function Board(emitter, mode) {
	this.event = emitter
	this.map = newMap()
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
	this.nbr = 0
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
	return true
}

Board.prototype.stop = function () {
	if (this.itr === 0)
		return
	clearInterval(this.itr)
	this.itr = undefined
	this.event.emit("end")
}

Board.prototype.get = function () {
	var copy = copyMap(this.map);
	if (this.piece)
		remove(copy, this.piece, this.x, this.y);
	return copy;
}

Board.prototype.add = function (piece) {
	if (this.piece || !piece)
		return false
	this.piece = JSON.parse(JSON.stringify(piece))
	this.x = Math.round((10 - piece.shape[0].length) / 2);
	this.y = 0
	
	var cpy = copyMap(this.map)
	if (placeable(cpy, this.piece, this.x, this.y)) {
		this.map = cpy
		this.event.emit("display", this.map)
		this.nbr++
		return true
	} else {
		return false
	}
}

Board.prototype.setMalus = function () {
	this.malus++
	var copy = copyMap(this.map)
	if (this.piece)
		remove(copy, this.piece, this.x, this.y)
	
	var a = copy[0].find(function(c) {
		return c != '.'
	})
	if (a)
		return false
	fillLine(copy, 20 - this.malus)
	if (this.piece) {
		var finalMap = copyMap(copy)
		placeable(finalMap, this.piece, this.x, this.y -1)
		if (!placeable(copy, this.piece, this.x, this.y)) {
			this.map = finalMap
		} else {
			this.map = copy
		}
	}
	if (this.mode === true && this.piece) {
		copy = copyMap(this.map)
		remove(copy, this.piece, this.x, this.y)
		this.event.emit("display", copy)
	} else
		this.event.emit("display", this.map)
//	showMap(this.map)
	return true
}


Board.prototype.place = function () {
	// if (this.lock)
	// 	return 
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	remove(copy, this.piece, this.x, this.y)
	while(placeable(copy, this.piece, this.x, this.y + 1)) {
		this.y++
		this.map = copyMap(copy)
		remove(copy, this.piece, this.x, this.y)
	}
	this.event.emit("display", this.map)
	delete this.piece
	return true
}

Board.prototype.down = function () {
	// if (this.lock)
	// 	return
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x, this.y+1)) {
			this.y++
			this.map = copy
//			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.event.emit("display", copy)
			} else
				this.event.emit("display", this.map)
			return true
		} else {
//			console.log("//////can't move doown piece\\\\\\")
//			showMap(this.map)
//			console.log(this.piece, this.x, this.y)
			delete this.piece
		}
	}
	return false
}

Board.prototype.left = function () {
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x - 1, this.y)) {
			this.x--
			this.map = copy
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.event.emit("display", copy)
			} else
				this.event.emit("display", this.map)
			//			showMap(this.map)
			return true
		}
	}
	return false

}

Board.prototype.right = function () {
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x + 1, this.y)) {
			this.x++
			this.map = copy
//			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.event.emit("display", copy)
			} else
				this.event.emit("display", this.map)
			return true
		}
	}
	return false
}

Board.prototype.rotate = function () {
	if (!this.piece)
		return
	this.lock = true;
	var copy = copyMap(this.map)
	var piece = copyMap(this.piece)		
	if (remove(copy, piece, this.x, this.y)) {
		rotateClockwise(piece)
		if (placeable(copy, piece, this.x, this.y)) {
			this.map = copy
			this.piece = piece
//			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.event.emit("display", copy)
			} else
				this.event.emit("display", this.map)
			return true
		}
	}
	this.lock = false;
	return false
}

Board.prototype.verify = function () {
	var copy = copyMap(this.map)
	var r = fullLine(this.map, this.map.length - this.malus)
	if (r.length > 0) {
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

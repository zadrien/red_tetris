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

function Board(socket, mode) {
	this.socket = socket
	this.map = newMap()
	this.piece = undefined
	this.x = 0
	this.y = 0
	this.mode = mode
	this.lock = false
	this.malus = 0
}

Board.prototype.get = function () {
	var copy = copyMap(this.map);
	if (this.piece)
		remove(copy, this.piece, this.x, this.y);
	return copy;
}

Board.prototype.add = function (piece) {
	console.log(piece)
	this.piece = JSON.parse(JSON.stringify(piece))
	this.x = Math.round((10 - piece.shape[0].length) / 2);
	this.y = 0

	var cpy = copyMap(this.map)
	console.log(this.piece)
	if (placeable(cpy, this.piece, this.x, this.y)) {
		this.map = cpy
		showMap(this.map)
		this.socket.emit("DISPLAY", this.map)
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
	if (this.mode === true) {
		copy = copyMap(this.map)
		remove(copy, this.piece, this.x, this.y)
		this.socket.emit("DISPLAY", copy)
	} else
		this.socket.emit("DISPLAY", this.map)
	showMap(this.map)
	return true
}


Board.prototype.place = function () {
	if (this.lock)
		return 
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	remove(copy, this.piece, this.x, this.y)
	while(placeable(copy, this.piece, this.x, this.y + 1)) {
		this.y++
		this.map = copyMap(copy)
		remove(copy, this.piece, this.x, this.y)
	}
	this.socket.emit("DISPLAY", this.map)
	delete this.piece
	return true
}

Board.prototype.down = function (instant = false) {
	if (this.lock)
		return
	if (!this.piece)
		return false
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x, this.y+1)) {
			this.y++
			this.map = copy
			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.socket.emit("DISPLAY", copy)
			} else
				this.socket.emit("DISPLAY", this.map)
			return true
		} else {
			console.log("//////can't move doown piece\\\\\\")
			showMap(this.map)
			console.log(this.piece, this.x, this.y)
			delete this.piece
			return false
		}
	}
}

Board.prototype.left = function () {
	if (!this.piece)
		return
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x - 1, this.y)) {
			this.x--
			this.map = copy
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.socket.emit("DISPLAY", copy)
			} else
				this.socket.emit("DISPLAY", this.map)
			showMap(this.map)
		}
	}

}

Board.prototype.right = function () {
	if (!this.piece)
		return
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
		if (placeable(copy, this.piece, this.x + 1, this.y)) {
			this.x++
			this.map = copy
			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.socket.emit("DISPLAY", copy)
			} else
				this.socket.emit("DISPLAY", this.map)
		}
	}
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
			showMap(this.map)
			if (this.mode == true) {
				copy = copyMap(this.map)
				remove(copy, this.piece, this.x, this.y)
				this.socket.emit("DISPLAY", copy)
			} else
				this.socket.emit("DISPLAY", this.map)
		}
	}
	this.lock = false;
}

Board.prototype.verify = function () {
	var copy = copyMap(this.map)
	var r = fullLine(this.map, 20 - this.malus)
	if (r.length > 0) {
		for (var i = r.length - 1; i >= 0; i--) {
			copy.splice(r[i], 1)
			copy.splice(0, 0, [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ])
		}
		this.map = copy
		this.socket.emit("DISPLAY", this.map)
		return r.length
	}
	return 0
}

export default Board

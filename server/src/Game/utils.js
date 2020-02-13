
import _ from 'lodash'

exports.buildMap = function() {
    var map = new Array(20);
    
    for(var i = 0; i < 20; i++) {
		map[i] = [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ];
    }
    return map.slice();
}

exports.clone = function(arr) {
    return _.cloneDeep(arr)
}

exports.merge = (map, piece, x, y) => {
	const { start } = piece

	let k = y
	for(let i = start; i < piece.shape.length; i++) {
		let l = x
		for(let j = 0; j < piece.shape[i].length; j++) {
			if (piece.shape[i][j] === piece.letter) {
				if (!map[k]) {
					return false
				} else if (map[k][l] && map[k][l] === '.') {
						map[k][l] = piece.letter
				} else
					return false
			}
			l++
		}
		k++
	}
	return true;
}

exports.remove = (map, piece, x, y) => {
	const { start } = piece

	let k = y
    for (var i = start; i < piece.shape.length; i++) {
		let l = x
		for(var j = 0; j < piece.shape[i].length; j++) {
			if (piece.shape[i][j] === piece.letter) {
				if (!map[k][l]) {
					return false;
				} else if (map[k][l] === piece.letter) {
					map[k][l] = '.';
				}
			}
			l++;
		}
		k++
    }
    return true;	
}



exports.addMallus = (map, pos) => {
    map.splice(0, 1) // need verification if the line is empty, if not down piece and continue
    map.push(['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'])

}


exports.isFull = (map, max, condition) => {
    var remove = []
    for (var i = max - 1; i > 0; i--) {
		if (!map[i].find(condition))
			remove.push(i)
	}
	if (remove.length === 0)
		return undefined
    return remove
}

exports.rotateRight = (piece) => {
    var rotation = piece.shape.reverse()
    piece.shape = rotation[0].map((v, k) => (
		rotation.map(row => row[k])
    ))
}

exports.rotateLeft = (piece) => {
    var undo = [...piece.shape]
    return undo[0].map((v, k) => (
		undo.map(row => row[k])
	))
}


exports.buildMap = function() {
    var map = new Array(20);
    
    for(var i = 0; i < 20; i++) {
		map[i] = [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ];
    }
    return map.slice();
}

exports.clone = function(arr) {
    return [...arr];
}

exports.merge = function (map, piece, mapX, mapY) {
    for(var y = 0; y < piece.shape.length; y++) {
		for(var x = 0; x < piece.shape[y].length; x++) {
			if (piece.shape[y][x] === piece.letter) {
				if (!map[mapY + y]) {
					return false
				} else if (map[mapY + y][mapX + x] === '.') {
					map[mapY + y][mapX + x] = piece.shape[y][x];
				} else
					return false
			}
		}	
    }
    return true;
}

// function remove(map, piece, mapX, mapY) {
//     for (var y = 0; y < piece.shape.length; y++) {
// 		for(var x = 0; x < piece.shape[y].length; x++) {
// 			if (piece.shape[y][x] === piece.letter) {
// 				if (!map[mapY + y][mapX + x]) {
// 					return false;
// 				} else if (map[mapY + y][mapX + x] === piece.letter) {
// 					map[mapY + y][mapX + x] = '.';
// 				}
// 			}
// 		}
//     }
//     return true;	
// }



// export function fillLine(map, pos) {
//     map.splice(0, 1) // need verification if the line is empty, if not down piece and continue
//     map.push(['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'])

// }


// export function fullLine(map, max) {
//     var remove = []
//     for (var i = max - 1; i > 0; i--) {
// 		if (!map[i].find(full))
// 			remove.push(i)
//     }
//     return remove
// }

// export function full(value) {
//     return value === '.'
// }


// export function rotateClockwise(piece) {
//     var rotation = piece.shape.reverse()
//     piece.shape = rotation[0].map((v, k) => (
// 		rotation.map(row => row[k])
//     ))
// }

// function rotateUndo(piece) {
//     var undo = helpers.copyMap(piece.shape)
//     var rotation = undo[0].map((v, k) => (
// 		undo.map(row => row[k])
//     ))
// }

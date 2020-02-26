
const shape = {
    Bar: {
	shape: [
	    ['.', '.', '.', '.'],
	    ['C', 'C', 'C', 'C'],
	    ['.', '.', '.', '.'],
	    ['.', '.', '.', '.']
	],
		start: 1,
	letter: 'C'
    },

    LeftL:{
	shape: [
	    ['B', '.', '.'],
	    ['B', 'B', 'B'],
	    ['.', '.', '.']
	],
		start: 0,
	letter: 'B'
    },

    RightL: {
	shape: [
	    ['.', '.', 'O'],
	    ['O', 'O', 'O'],
	    ['.', '.', '.']
	],
		start: 0,
	letter: 'O'
    },

    Cube: {
	shape: [
	    ['Y', 'Y'],
	    ['Y', 'Y'],
	],
		start: 0,		
	letter: 'Y'
    },

    RightZ: {
	shape: [
	    ['.', 'G', 'G'],
	    ['G', 'G', '.'],
	    ['.', '.', '.']
	],
	start: 0,
	letter: 'G'
    },

    TShape: {
	shape: [
	    ['.', 'V', '.'],
	    ['V', 'V', 'V'],
	    ['.', '.', '.']
	],
		start: 0,
	letter: 'V'
    },

    LeftZ: {
	shape: [
	    ['R', 'R', '.'],
	    ['.', 'R', 'R'],
	    ['.', '.', '.']
	],
	start: 0,
	letter: 'R'
    }
}

const keys = Object.keys(shape)

function Tetraminos() {
    var i =  Math.floor(Math.random() * Math.floor(7));

    return Object.assign({}, shape[keys[i]]);
}

module.exports = {
	Tetraminos,
	shape
}
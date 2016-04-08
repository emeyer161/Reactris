let pieces = {
	1: { // I block
		1:{
			type:1,
			startPosition:4,
		},
		2:{
			type:0,
			startPosition:1
		},
		3:{
			type:1,
			startPosition:2,
		},
		4:{
			type:2,
			startPosition:2,
		},
	},
	2: { // L1 block
		1:{
			type:3,
			startPosition:3,
		},
		2:{
			type:1,
			startPosition:4
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:1,
			startPosition:2,
		},
	},
	3: { // L2 block
		1:{
			type:3,
			startPosition:2,
		},
		2:{
			type:1,
			startPosition:4
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:1,
			startPosition:2,
		},
	},
	4: { // T block
		1:{
			type:1,
			startPosition:3,
		},
		2:{
			type:1,
			startPosition:4
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:1,
			startPosition:2,
		},
	},
	5: { // Z1 block
		1:{
			type:3,
			startPosition:3,
		},
		2:{
			type:1,
			startPosition:3
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:1,
			startPosition:2,
		},
	},
	6: { // Z2 block
		1:{
			type:1,
			startPosition:4,
		},
		2:{
			type:1,
			startPosition:3
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:3,
			startPosition:2,
		},
	},
	7: { // O block
		1:{
			type:0,
			startPosition:1
		},
		2:{
			type:1,
			startPosition:2
		},
		3:{
			type:3,
			startPosition:2,
		},
		4:{
			type:1,
			startPosition:3,
		},
	},
}

let rotationPositions = {
	0:{
		1:{X:0, Y:0},
		2:{X:0, Y:0},
		3:{X:0, Y:0},
		4:{X:0, Y:0}
	},
	1:{
		1:{X:0, Y:-1},
		2:{X:1, Y:0},
		3:{X:0, Y:1},
		4:{X:-1, Y:0}
	},
	2:{
		1:{X:0, Y:-2},
		2:{X:2, Y:0},
		3:{X:0, Y:2},
		4:{X:-2, Y:0}
	},
	3:{
		1:{X:1, Y:-1},
		2:{X:1, Y:1},
		3:{X:-1, Y:1},
		4:{X:-1, Y:-1}
	}
}

function _removeExcess(num){
	while (num > 4) {
        num-=4;
    }
    return num;
}

export function getPositions(piece, orientation){
	var	piecePositions 	= [];

	for (var b=1; b<5; b++){	// for each block
		var block 		= pieces[piece][b];
		var pos 		= block.startPosition + orientation;
		var position 	= _removeExcess(pos);

		piecePositions.push( 
			rotationPositions[block.type][position]
		);
	}
	return piecePositions;
}

export function getPieceCount(){
	return Object.keys(pieces).length;
}
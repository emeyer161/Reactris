import { modifyBlock } from './repository';

let pieces = {
	1: { // O block
		1:{
			type:0,
			startPosition:1,
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
		color:'Orange'
	},
	2: { // I block
		1:{
			type:2,
			startPosition:2,
		},
		2:{
			type:1,
			startPosition:2
		},
		3:{
			type:0,
			startPosition:1,
		},
		4:{
			type:1,
			startPosition:4,
		},
		color:'Aqua'
	},
	3: { // S block
		1:{
			type:3,
			startPosition:2,
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
			startPosition:4,
		},
		color:'IndianRed'
	},
	4: { // Z block
		1:{
			type:1,
			startPosition:2,
		},
		2:{
			type:0,
			startPosition:1
		},
		3:{
			type:1,
			startPosition:3
		},
		4:{
			type:3,
			startPosition:3,
		},
		color:'Gold'
	},
	5: { // L block
		1:{
			type:3,
			startPosition:2,
		},
		2:{
			type:1,
			startPosition:2
		},
		3:{
			type:0,
			startPosition:1
		},
		4:{
			type:1,
			startPosition:4,
		},
		color:'HotPink'
	},
	6: { // J block
		1:{
			type:1,
			startPosition:2,
		},
		2:{
			type:0,
			startPosition:1
		},
		3:{
			type:1,
			startPosition:4
		},
		4:{
			type:3,
			startPosition:3,
		},
		color:'BlueViolet'
	},
	7: { // T block
		1:{
			type:1,
			startPosition:2,
		},
		2:{
			type:0,
			startPosition:1
		},
		3:{
			type:1,
			startPosition:3
		},
		4:{
			type:1,
			startPosition:4,
		},
		color:'Chartreuse'
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
		2:{X:-1, Y:0},
		3:{X:0, Y:1},
		4:{X:1, Y:0},
	},
	2:{
		1:{X:0, Y:-2},
		2:{X:-2, Y:0},
		3:{X:0, Y:2},
		4:{X:2, Y:0},
	},
	3:{
		1:{X:-1, Y:-1},
		2:{X:-1, Y:1},
		3:{X:1, Y:1},
		4:{X:1, Y:-1},
	}
}

function _removeExcess(num){
	while (num > 4) {
        num-=4;
    }
    return num;
}

export function getBlocks(piece, orientation){
	var	blocks 	= [];

	for (var b=1; b<5; b++){	// for each block
		var block 		= pieces[piece][b];
		var position 	= _removeExcess(block.startPosition + orientation);

		var pBlock 		= rotationPositions[block.type][position];
		var pcBlock 	= modifyBlock(pBlock, {color:pieces[piece].color});

		blocks.push( 
			pcBlock
		);
	}
	return blocks;
}

export function getColor(){
	return 'orange';
}

export function getPieceCount(){
	return Object.keys(pieces).length;
}
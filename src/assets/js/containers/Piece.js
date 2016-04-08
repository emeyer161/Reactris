import React from 'react';
import BlockStructure from './BlockStructure';

import PieceStore from '../stores/PieceStore';

class Piece extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = PieceStore;
	}

	_getColor(){
		switch(PieceStore.getPieceType()){
			case 1:
				return 'cyan'
			case 2:
			case 3:
				return 'purple'
			case 4:
				return 'green';
			case 5:
			case 6:
				return 'yellow';
			case 7:
				return 'red';
			default:
				return 'gray';
		}
	}
}

export default Piece;


import React from 'react';
import BlockStructure from './BlockStructure';

import PieceStore from '../stores/PieceStore';

class Piece extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = PieceStore;
	}

}

export default Piece;


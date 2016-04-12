import React from 'react';
import BlockStructure from './BlockStructure';

import NextPieceStore from '../stores/NextPieceStore';

class NextPiece extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = NextPieceStore;
	}

}

export default NextPiece;
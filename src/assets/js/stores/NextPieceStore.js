import BaseStore from './BaseStore';
import dispatcher from '../dispatcher';

import { getBlocks, getPieceCount } from '../Pieces';
import { modifyBlocks } from '../repository';

class NextPieceStore extends BaseStore {

	getInitialState(){
    	return {
			type: 		null,
			blocks: 	[],
			rawBlocks: 	[],
		};
    }

	register(action){
		switch(action.type){
			case "New Game":
			case "Piece Played":
				this.setState(this._newPiece());
				break;
			default:
				break;
		}
	}

	_newPiece(){
		var type 		= Math.ceil(Math.random()*getPieceCount());
		var rawBlocks 	= getBlocks( type, 1 );
		var blocks 		= modifyBlocks(rawBlocks, {X: 2, Y: 2.5});

		return {
			type: 		type,
			blocks: 	blocks,
			rawBlocks: 	rawBlocks,
		}
	}

	// getNextPiece(){
	// 	return this.state.rawBlocks;
	// }

	getBlocks(){
		return this.state.blocks;
	}

	getPieceType(){
		return this.state.type;
	}

}

export default new NextPieceStore();
import BaseStore from './BaseStore';
import dispatcher from '../dispatcher';

import SettingsStore from './SettingsStore';

import { getBlocks, getPieceCount } from '../Pieces';
import { modifyBlocks } from '../repository';

class NextPieceStore extends BaseStore {

	getInitialState(){
    	return this._newPiece();
    }

	_newPiece(){
		var type 		= Math.ceil(Math.random()*getPieceCount());
		var rawBlocks 	= getBlocks( type, 1 );
		var blocks 		= modifyBlocks(rawBlocks, {
			X: Math.ceil(SettingsStore.getDashBoardSize().width/2)+1,
			Y: 3
		})
		return {
			type: 		type,
			blocks: 	blocks,
			rawBlocks: 	rawBlocks,
		}
	}

	register(action){
		switch(action.type){
			case "Piece Played":
				this.setState(this._newPiece());
				break;
			default:
				break;
		}
	}

	getNextPiece(){
		return this.state.rawBlocks;
	}

	getBlocks(){
		return this.state.blocks;
	}

	getPieceType(){
		return this.state.type;
	}

}

export default new NextPieceStore();
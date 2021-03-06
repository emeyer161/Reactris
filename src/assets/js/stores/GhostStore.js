import BaseStore from './BaseStore';
import PieceStore from './PieceStore';
import LandscapeStore from './LandscapeStore';
import { modifyBlock, modifyBlocks, lockBlocks } from '../repository';

import dispatcher from '../dispatcher';

class GhostStore extends BaseStore {

	getInitialState(){
    	return this._emptyState();
    }

    _emptyState(){
    	return {
    		blocks: []
    	};
    }

	register(action){
		switch(action.type){
			case "Piece Played":
			case "Piece Moved":
				this._update();
				break;
			case "Game Over":
				this.setState( this._emptyState() );
				break;
			default:
				break;
		}
	}

	_update(){
		this.setState({
			blocks: lockBlocks( PieceStore.getBlocks() )
		});
	}

	getBlocks(){
		return this.state.blocks;
	}

	getPieceColor(){
		return this.state.color;
	}

}

export default new GhostStore();
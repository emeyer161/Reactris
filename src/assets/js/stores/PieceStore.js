import BaseStore from './BaseStore';
import LandscapeStore from './LandscapeStore';
import GhostStore from './GhostStore';
import dispatcher from '../dispatcher';

import { stopTicker } from '../actions/driverActions';

import { modifyBlock, modifyBlocks, lockBlocks } from '../repository';
import { getBlocks, getPieceCount } from '../Pieces';

class PieceStore extends BaseStore {

	getInitialState(){
    	return this._emptyState();
    }

	_emptyState(){
		return {
			type: 			null,
			orientation: 	null,
			location: 		{},
			blocks: 		[],
			live: 			false
		}
	}

	register(action){
		switch(action.type){
			case "New Game":
				this._newPiece();
				break;
			case "Timer Ticked":
				this.state.live && this._movePiece('down');
				break;
			case "Piece Landed":
				this._newPiece();
				break;
			case "User Input":
				this.state.live && this._movePiece(action.movement);
				break;
			case "Game Over":
				this.setState({
					live: false
				});
				// stopTicker();
				// this.setState( this._emptyState() );
				break;
			default:
				break;
		}
	}

	_newPiece(){
		var type 	= Math.ceil(Math.random()*getPieceCount());
		var start 	= LandscapeStore.getStartpoint()

		this.setState({
			type: 			type,
			orientation: 	1,
			location: 		start,
			blocks: modifyBlocks( getBlocks(type, 1), start ),
			live: 			true
		});

		if(!LandscapeStore.isSpaceEmpty(this.state.blocks)){
			dispatcher.dispatch({
				type: "Game Over"
			});
		} else {
			dispatcher.dispatch({
				type: "New Piece"
			});
		}
	}

	_movePiece(direction){
		var modBlocks = [],
			modLocation = this.state.location,
			modOrientation = this.state.orientation;

		switch(direction){
			case 'rotate':
				modBlocks = modifyBlocks( getBlocks(this.state.type, this.state.orientation+1),  this.state.location );
				modOrientation = this.state.orientation+1;
				break;
			case 'lock':
				this.setState({
					blocks: lockBlocks(this.state.blocks)
				});
				dispatcher.dispatch({
					type: "Piece Landed",
					blocks: this.state.blocks
				});
				return;
			case 'down':
				modBlocks = modifyBlocks( this.state.blocks, {Y:1} );
				modLocation = modifyBlocks([this.state.location], {Y:1})[0];

				if(!LandscapeStore.isSpaceEmpty(modBlocks)){
					dispatcher.dispatch({
						type: "Piece Landed",
						blocks: this.state.blocks
					});
					return;
				}
				break;
			case 'left':
				modBlocks = modifyBlocks( this.state.blocks, {X:-1} );
				modLocation = modifyBlocks([this.state.location], {X:-1})[0];
				break;
			case 'right':
				modBlocks = modifyBlocks( this.state.blocks, {X:1} );
				modLocation = modifyBlocks([this.state.location], {X:1})[0];
				break;
			default:
				console.log('Not a movement');
				return;
		}

		if(LandscapeStore.isSpaceEmpty(modBlocks)){
			this.setState({
				blocks: 		modBlocks,
				location: 		modLocation,
				orientation: 	modOrientation
			});
			dispatcher.dispatch({
				type: "Piece Moved"
			});
		}
	}

	getBlocks(){
		return this.state.blocks;
	}

	getPieceColor(){
		return this.state.color;
	}

	getPieceType(){
		return this.state.type;
	}

}

export default new PieceStore();
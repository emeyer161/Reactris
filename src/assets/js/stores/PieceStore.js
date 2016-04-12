import BaseStore from './BaseStore';
import LandscapeStore from './LandscapeStore';
import GhostStore from './GhostStore';
import NextPieceStore from './NextPieceStore';
import dispatcher from '../dispatcher';

import { modifyBlock, modifyBlocks, lockBlocks } from '../repository';
import { getBlocks, getPieceCount } from '../Pieces';

class PieceStore extends BaseStore {

	getInitialState(){
    	return {
			type: 			null,
			orientation: 	null,
			location: 		{},
			blocks: 		[],
			nextBlocks: 	[],
			live: 			false
		}
    }

	register(action){
		switch(action.type){
			case "New Game":
				this._setPiece(Math.ceil(Math.random()*getPieceCount()));
			case "Piece Landed":
				this._playPiece();
			case "Timer Ticked":
				this.state.live && this._movePiece('down');
				break;
			case "User Input":
				this.state.live && this._movePiece(action.movement);
				break;
			case "Game Over":
				this.setState({
					live: false
				});
				break;
			default:
				break;
		}
	}

	_setPiece(type){
		this.setState({
			type: 			type,
			orientation: 	1,
			location: 		{X: 7, Y:3},
			blocks: 		modifyBlocks( getBlocks(type, 1), {X: 7, Y:3} ),
			live: 			true
		});
	}

	_playPiece(){
		this._setPiece(NextPieceStore.getPieceType());

		dispatcher.dispatch({
			type: "Piece Played"
		});

		!LandscapeStore.isSpaceEmpty(this.state.blocks) &&
		dispatcher.dispatch({
			type: "Game Over"
		});
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
			case 'left':
				modBlocks = modifyBlocks( this.state.blocks, {X:-1} );
				modLocation = modifyBlock(this.state.location, {X:-1});
				break;
			case 'right':
				modBlocks = modifyBlocks( this.state.blocks, {X:1} );
				modLocation = modifyBlock(this.state.location, {X:1});
				break;
			case 'down':
				modBlocks = modifyBlocks( this.state.blocks, {Y:1} );
				modLocation = modifyBlock(this.state.location, {Y:1});

				if(!LandscapeStore.isSpaceEmpty(modBlocks)){
					dispatcher.dispatch({
						type: "Piece Landed",
						blocks: this.state.blocks
					});
					return;
				}
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

	getPieceType(){
		return this.state.type;
	}

}

export default new PieceStore();
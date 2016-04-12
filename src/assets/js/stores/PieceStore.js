import BaseStore from './BaseStore';
import LandscapeStore from './LandscapeStore';
import GhostStore from './GhostStore';
import NextPieceStore from './NextPieceStore';
import dispatcher from '../dispatcher';

import { stopTicker } from '../actions/driverActions';

import { modifyBlock, modifyBlocks, lockBlocks } from '../repository';
import { getBlocks } from '../Pieces';

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
			nextBlocks: 	[],
			live: 			false
		}
	}

	register(action){
		switch(action.type){
			case "New Game":
			case "Piece Landed":
				this._playPiece();
			case "Timer Ticked":
				this.state.live && this._movePiece('down');
				break;
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

	_playPiece(){
		var start 	= LandscapeStore.getStartpoint()

		this.setState({
			type: 			NextPieceStore.getPieceType(),
			orientation: 	1,
			location: 		start,
			blocks: 		modifyBlocks( NextPieceStore.getNextPiece(), start ),
			live: 			true
		});

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
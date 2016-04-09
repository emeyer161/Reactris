import BaseStore from './BaseStore';
import LandscapeStore from './LandscapeStore';
import { getBlocks, modifyBlock, getPieceCount } from '../Pieces';

import dispatcher from '../dispatcher';
import { stopTicker } from '../actions/driverActions';

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
			blocks: this._modifyBlocks( getBlocks(type, 1), start ),
			live: 			true
		});

		if(!LandscapeStore.isSpaceEmpty(this.state.blocks)){
			dispatcher.dispatch({
				type: "Game Over"
			});
		}
	}

	_modifyBlocks(blocks, modifier){
		var modBlocks =[];
		blocks.map(function(b){
			modBlocks.push(modifyBlock(b, modifier));
		})
		return modBlocks;
	}

	_movePiece(direction){
		var modBlocks = [],
			modLocation = this.state.location,
			modOrientation = this.state.orientation;

		switch(direction){
			case 'rotate':
				modBlocks = this._modifyBlocks( getBlocks(this.state.type, this.state.orientation+1),  this.state.location );
				modOrientation = this.state.orientation+1;
				break;
			case 'down':
				modBlocks = this._modifyBlocks( this.state.blocks, {X:0, Y:1} );
				modLocation = this._modifyBlocks([this.state.location], {X:0, Y:1})[0];

				if(!LandscapeStore.isSpaceEmpty(modBlocks)){
					dispatcher.dispatch({
						type: "Piece Landed",
						blocks: this.state.blocks
					});
					return;
				}
				break;
			case 'left':
				modBlocks = this._modifyBlocks( this.state.blocks, {X:-1, Y:0} );
				modLocation = this._modifyBlocks([this.state.location], {X:-1, Y:0})[0];
				break;
			case 'right':
				modBlocks = this._modifyBlocks( this.state.blocks, {X:1, Y:0} );
				modLocation = this._modifyBlocks([this.state.location], {X:1, Y:0})[0];
				break;
			default:
				console.log('Not a movement');
				return;
		}

		console.log('made it out');
		if(LandscapeStore.isSpaceEmpty(modBlocks)){
			this.setState({
				blocks: 		modBlocks,
				location: 		modLocation,
				orientation: 	modOrientation
			})
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
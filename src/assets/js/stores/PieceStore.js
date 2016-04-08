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

		console.log(this.state);

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
		// for (var i=0; i<blocks.length; i++){
		// 	modBlocks[i]  		= {X: null, Y: null, color:''};
		// 	modBlocks[i].X  	= blocks[i].X + modifier.X;
		// 	modBlocks[i].Y  	= blocks[i].Y + modifier.Y;
		// 	modBlocks[i].color  = modifier.color || blocks[i].color;
		// }
		return modBlocks;
	}

	_calculateLocation(transformation){
		if (transformation == 'rotate'){
			return 	this._modifyBlocks(
						getBlocks(this.state.type, this.state.orientation+1), 
						this.state.location
					);
		} else {
			return 	this._modifyBlocks(
						this.state.blocks,
						transformation
					);
		}
	}

	_movePiece(direction){
		switch(direction){
			case 'rotate':
				if (LandscapeStore.isSpaceEmpty(this._calculateLocation('rotate'))){
					this.setState({
						orientation: 	this.state.orientation+1,
						blocks: this._calculateLocation('rotate')
					})
				}
				break;
			case 'down':
				if (LandscapeStore.isSpaceEmpty(this._calculateLocation({X:0, Y:1}))){
					this.setState({
						blocks: this._calculateLocation({X:0, Y:1}),
						location: this._modifyBlocks([this.state.location], {X:0, Y:1})[0]
					})
				} else {
					dispatcher.dispatch({
						type: "Piece Landed",
						blocks: this.state.blocks
					});
				}
				break;
			case 'left':
				if (LandscapeStore.isSpaceEmpty(this._calculateLocation({X:-1, Y:0}))){
					this.setState({
						blocks: this._calculateLocation({X:-1, Y:0}),
						location: this._modifyBlocks([this.state.location], {X:-1, Y:0})[0]
					})
				}
				break;
			case 'right':
				if (LandscapeStore.isSpaceEmpty(this._calculateLocation({X:1, Y:0}))){
					this.setState({
						blocks: this._calculateLocation({X:1, Y:0}),
						location: this._modifyBlocks([this.state.location], {X:1, Y:0})[0]
					})
				}
				break;
			default:
				console.log('Not a movement');
				break;
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
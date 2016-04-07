import BaseStore from './BaseStore';
import LandscapeStore from './LandscapeStore';
import {getPositions, getPieceCount} from '../Positions';

import dispatcher from '../dispatcher';

class PieceStore extends BaseStore {

	getInitialState(){
    	return {
			type: 			Math.ceil(Math.random())*getPieceCount(),
			orientation: 	1,
			location: 		LandscapeStore.getStartpoint(),
			blockLocations: [
								//	{X:0, Y:0},
								//	{X:0, Y:0},
								//	{X:0, Y:0},
								//	{X:0, Y:0},
							]
		}
    }

	register(action){
		switch(action.type){
			case "New Game":
				this._newPiece();
				break;
			case "Timer Ticked":
				this._movePiece('down');
				break;
			case "User Input":
				this._movePiece(action.movement);
				break;
			default:
				break;
		}
	}

	_newPiece(){
		var type = Math.ceil(Math.random()*getPieceCount());

		this.setState({
			type: 			type,
			orientation: 	1,
			location: 		LandscapeStore.getStartpoint(),
			blockLocations: this._modifyPositions(
								getPositions(type, 1), LandscapeStore.getStartpoint()
							)
		});
	}

	_modifyPositions(position, modifier){
		var locations =[];
		for (var i=0; i<position.length; i++){
			locations[i] = {X: null, Y: null};
			locations[i].X = position[i].X + modifier.X;
			locations[i].Y = position[i].Y + modifier.Y;
		}
		return locations;
	}

	_calculateNextLocations(transformation){
		if (transformation == 'rotate'){
			return 	this._modifyPositions(
						getPositions(this.state.type, this.state.orientation+1), 
						this.state.location
					);
		} else {
			return 	this._modifyPositions(
						this.state.blockLocations,
						transformation
					);
		}
	}

	_movePiece(direction){
		switch(direction){
			case 'rotate':
				if (LandscapeStore.isSpaceEmpty(this._calculateNextLocations('rotate'))){
					this.setState({
						orientation: 	this.state.orientation+1,
						blockLocations: this._calculateNextLocations('rotate')
					})
				}
				break;
			case 'down':
				if (LandscapeStore.isSpaceEmpty(this._calculateNextLocations({X:0, Y:1}))){
					this.setState({
						blockLocations: this._calculateNextLocations({X:0, Y:1}),
						location: this._modifyPositions([this.state.location], {X:0, Y:1})[0]
					})
				} else {
					dispatcher.dispatch({
						type: "Piece Landed",
						locations: this.state.blockLocations
					});
					this._newPiece();
				}
				break;
			case 'left':
				if (LandscapeStore.isSpaceEmpty(this._calculateNextLocations({X:-1, Y:0}))){
					this.setState({
						blockLocations: this._calculateNextLocations({X:-1, Y:0}),
						location: this._modifyPositions([this.state.location], {X:-1, Y:0})[0]
					})
				}
				break;
			case 'right':
				if (LandscapeStore.isSpaceEmpty(this._calculateNextLocations({X:1, Y:0}))){
					this.setState({
						blockLocations: this._calculateNextLocations({X:1, Y:0}),
						location: this._modifyPositions([this.state.location], {X:1, Y:0})[0]
					})
				}
				break;
			default:
				console.log('Not a movement');
				break;
		}
	}

	getBlockLocations(){
		return this.state.blockLocations;
	}

}

export default new PieceStore();
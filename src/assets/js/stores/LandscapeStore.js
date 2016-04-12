import BaseStore from './BaseStore';

import dispatcher from '../dispatcher';

import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blocks: 	this._emptyLandscape(),
			width: 		12,
    		height: 	22,
    		dashWidth: 	5,
    		dashHeight: 22,	 	
		}
    }

    _emptyLandscape(){
    	var sidesArray = [];
    	for (var x=1; x<=17; x++){ 	// Draw Horizontal
    		sidesArray.push({X:x, Y:1, color:'gray'});
    		sidesArray.push({X:x, Y:22, color:'gray'});
    	}
    	for (var y=1; y<=22; y++){	// Draw Vertical
    		sidesArray.push({X:1, Y:y, color:'gray'});
    		for (var x=12; x<=17; x++){
    			sidesArray.push({X:x, Y:y, color:'gray'});
    		}
    	}
    	return sidesArray;
    }

	register(action){
		switch(action.type){
			case "New Game":
				this.setState({
					blocks: this._emptyLandscape()
				})
				break;
			case "Piece Landed":
				var newLocations = this.state.blocks;
				action.blocks.map(function(l){
					newLocations.push(l);
				});

				this.setState({
					blocks: this._checkRows(newLocations)
				});
				break;
			default:
				break;
		}
	}

	_checkRows(){
		var newblocks = this.state.blocks;
		for (var r=22; r>1; r--){
			if(this._rowFull(newblocks, r)){				// If row at current index is full
				newblocks = this._removeRow(newblocks, r);	// Remove that row from array
				newblocks = this._dropRows(newblocks, r);	// Drop all rows above
				dispatcher.dispatch({
					type: "Row Cleared",
				});
				r++;
			}
		}
		return newblocks;
	}

	_rowFull(array, row){
		return	_.filter(array, function(b){
					return (b.Y == row) && this._onBoard(b);
				}.bind(this)).length == 10;
	}

	_removeRow(array, row){
		return 	_.reject(array, function(b){
					return ((b.Y == row) && this._onBoard(b));
				}.bind(this));
	}

	_dropRows(array, row){
		return _.forEach(array, function(b){
					if ((b.Y < row) && this._onBoard(b)){
						b.Y += 1;
					}
				}.bind(this));
	}

	_onBoard(block){
		return 	(block.X > 1) && (block.X < 12) && 
				(block.Y > 1) && (block.Y < 22);
	}

	getBlocks(){
		return this.state.blocks;
	}
	
	isSpaceEmpty(piece){
		for (var i=0; i<piece.length; i++){
			if (_.findIndex(this.state.blocks, function(b){
				return (piece[i].X == b.X) && (piece[i].Y == b.Y)
			}) >=0 ){
				return false;
			}
		}
		return true
	}

}

export default new LandscapeStore();
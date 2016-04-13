import BaseStore from './BaseStore';

import dispatcher from '../dispatcher';

import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blocks: 	[],
			width: 		10,
    		height: 	20, 	
		}
    }

	register(action){
		switch(action.type){
			case "New Game":
				this.setState({
					blocks: []
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
		var newblocks 	= this.state.blocks,
			rowsCleared = 0;
		for (var r=20; r>0; r--){
			if(this._rowFull(newblocks, r)){				// If row at current index is full
				newblocks = this._removeRow(newblocks, r);	// Remove that row from array
				newblocks = this._dropRows(newblocks, r);	// Drop all rows above
				rowsCleared++;
				r++;
			}
		}
		rowsCleared && 	dispatcher.dispatch({
							type: "Rows Cleared",
							rows: rowsCleared
						});
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
		return 	(block.X >= 1) && (block.X <= 10) && 
				(block.Y >= 1) && (block.Y <= 20);
	}

	getBlocks(){
		return this.state.blocks;
	}
	
	isSpaceEmpty(piece){
		for (var i=0; i<piece.length; i++){
			if (_.findIndex(this.state.blocks, function(b){
				return (piece[i].X == b.X) && (piece[i].Y == b.Y)
			}) >=0 || !this._onBoard(piece[i])){
				return false;
			}
		}
		return true
	}

}

export default new LandscapeStore();
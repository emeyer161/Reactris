import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';

import dispatcher from '../dispatcher';

import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blocks: 	[],
			width: 		SettingsStore.getGameBoardSize().width,
    		height: 	SettingsStore.getGameBoardSize().height,
    		dashWidth: 	SettingsStore.getDashBoardSize().width,
    		dashHeight: SettingsStore.getDashBoardSize().height,	 	
		}
    }

    storeDidMount(){
    	this._updateSize = this._updateSize.bind(this);
    	SettingsStore.addChangeListener(this._updateSize);
    }

    // Need Store Unmount I think!

    _updateSize(){
    	this.setState({
			width: 		SettingsStore.getGameBoardSize().width,
    		height: 	SettingsStore.getGameBoardSize().height,
    		dashWidth: 	SettingsStore.getDashBoardSize().width,
    		dashHeight: SettingsStore.getDashBoardSize().height,
		});
    }

    _constructSides(){
    	var sidesArray = [];
    	for (var x=2; x<this.state.width+this.state.dashWidth+1; x++){ // Draw Horizontal
    		sidesArray.push({X:x, Y:1, color:'gray'});
    		sidesArray.push({X:x, Y:this.state.height, color:'gray'});
    	}
    	for (var y=1; y<=this.state.height; y++){					// Draw Vertical
    		sidesArray.push({X:1, Y:y, color:'gray'});
    		sidesArray.push({X:this.state.width, Y:y, color:'gray'});
    		sidesArray.push({X:this.state.width+1, Y:y, color:'gray'});
    		sidesArray.push({X:this.state.width+this.state.dashWidth, Y:y, color:'gray'});
    	}
    	for (var y=1; y<=6; y++){
    		for (var x=1; x<=this.state.dashWidth; x++){
    			sidesArray.push({X:this.state.width+x, Y:y, color:'gray'});
    		}
    	}
    	this.setState({
    		blocks: sidesArray
    	});
    }

	register(action){
		switch(action.type){
			case "New Game":
				this._constructSides();
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
		for (var r=this.state.height-1; r>1; r--){
			if(this._rowFull(newblocks, r)){
				console.log(r);						// If row at current index is full
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
				}.bind(this)).length == this.state.width-2;
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
		return 	(block.X > 1) && (block.X < this.state.width) && 
				(block.Y > 1) && (block.Y < this.state.height);
	}

	getStartpoint(){
		return {X: Math.ceil((this.state.width+1)/2), Y:3}
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
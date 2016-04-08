import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';

import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blocks: 	[],
			width: 		SettingsStore.getBoardSize().width,
    		height: 	SettingsStore.getBoardSize().height
		}
    }

    storeDidMount(){
    	this._updateSize = this._updateSize.bind(this);
    	SettingsStore.addChangeListener(this._updateSize);
    }

    _updateSize(){
    	this.setState({
			width: 		SettingsStore.getBoardSize().width,
    		height: 	SettingsStore.getBoardSize().height
		});
    }

    // Need Store Unmount I think!

    _constructSides(){
    	var sidesArray = [];
    	for (var i=2; i<this.state.width; i++){
    		sidesArray.push({X:i, Y:this.state.height, color:'gray'});
    	}
    	for (var i=1; i<=this.state.height; i++){
    		sidesArray.push({X:1, Y:i, color:'gray'});
    		sidesArray.push({X:this.state.width, Y:i, color:'gray'});
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
		for (var r=this.state.height-1; r>=0; r--){
			if(this._rowFull(newblocks, r)){						// If row at current index is full
				newblocks = this._removeRow(newblocks, r);	// Remove that row from array
				newblocks = this._dropRows(newblocks, r);	// Drop all rows above
				r++;
			}
		}
		return newblocks;
	}

	_rowFull(array, row){
		return	_.filter(array, function(b){
					return b.Y == row;
				}).length >= this.state.width;
	}

	_removeRow(array, row){
		return 	_.reject(array, function(b){
					return ((b.Y == row) && (b.X != 1) && (b.X != this.state.width));
				}.bind(this));
	}

	_dropRows(array, row){
		return _.forEach(array, function(b){
					if ((b.Y<row) && (b.X != 1) && (b.X != this.state.width)){
						b.Y += 1;
					}
				}.bind(this));
	}

	getStartpoint(){
		return {X: Math.ceil(this.state.width/2), Y:1}
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
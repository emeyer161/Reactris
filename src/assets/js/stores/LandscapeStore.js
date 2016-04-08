import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';

import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blockLocations: 	[],
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
    		sidesArray.push({X:i, Y:this.state.height});
    	}
    	for (var i=1; i<=this.state.height; i++){
    		sidesArray.push({X:1, Y:i});
    		sidesArray.push({X:this.state.width, Y:i});
    	}
    	this.setState({
    		blockLocations: sidesArray
    	});
    }

	register(action){
		switch(action.type){
			case "New Game":
				this._constructSides();
				break;
			case "Piece Landed":
				var newLocations = this.state.blockLocations;
				action.locations.map(function(l){
					newLocations.push(l);
				});

				this.setState({
					blockLocations: this._checkRows(newLocations)
				});
				break;
			default:
				break;
		}
	}

	_checkRows(){
		var newBlockLocations = this.state.blockLocations;
		for (var r=this.state.height-1; r>=0; r--){
			if(this._rowFull(newBlockLocations, r)){						// If row at current index is full
				newBlockLocations = this._removeRow(newBlockLocations, r);	// Remove that row from array
				newBlockLocations = this._dropRows(newBlockLocations, r);	// Drop all rows above
				r++;
			}
		}
		return newBlockLocations;
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

	getBlockLocations(){
		return this.state.blockLocations;
	}
	
	isSpaceEmpty(locations){
		for (var i=0; i<locations.length; i++){
			if (_.findIndex(this.state.blockLocations, locations[i]) >=0){
				return false;
			}
		}
		return true
	}

}

export default new LandscapeStore();
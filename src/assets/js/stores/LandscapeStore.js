import BaseStore from './BaseStore';
import _ from 'lodash';

class LandscapeStore extends BaseStore {

	getInitialState(){
    	return {
			blockLocations: 	[],
			width: 		10,
    		height: 	20
		}
    }

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
		for (var i=this.state.height-1; i>=0; i--){
			var filled = _.filter(this.state.blockLocations, function(b){
							return b.Y == i;
						});
			if(filled.length >= this.state.width){
				newBlockLocations = _.reject(newBlockLocations, function(b){
										return ((b.Y == i) && (b.X != 1) && (b.X != this.state.width));
									}.bind(this));
				_.forEach(newBlockLocations, function(b){
					if ((b.Y<i) && (b.X != 1) && (b.X != this.state.width)){
						b.Y += 1;
					}
				}.bind(this));
				// i++;
			}
		}
		return newBlockLocations;
	}

	getStartpoint(){
		return {X: Math.floor(this.state.width/2), Y:1}
	}

	isSpaceEmpty(locations){
		for (var i=0; i<locations.length; i++){
			if (_.findIndex(this.state.blockLocations, locations[i]) >=0){
				return false;
			}
		}
		return true
	}

	getBlockLocations(){
		return this.state.blockLocations;
	}

}

export default new LandscapeStore();
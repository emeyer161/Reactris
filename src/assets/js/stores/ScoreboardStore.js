import BaseStore from './BaseStore';
import { setTicker, quickerTicker, slowTicker } from '../actions/tickerActions';

class ScoreboardStore extends BaseStore {

	getInitialState(){
    	return this._initialState();
    }

	_initialState(){
		return {
			standardScore: 	0,
			arcadeScore: 	0,
			rows: 			0,
			level: 			1,
		}
	}

	register(action){
		switch(action.type){
			case "New Game":
				this.setState(this._initialState());
				setTicker(this.state.level);
				break;
			case "Piece Landed":
				var pointAward = ( (21 + (3 * this.state.level)) - action.age );
				this.setState({
					standardScore: this.state.standardScore + pointAward
				})
				break;
			case "Rows Cleared":
				var newRows 	= this.state.rows+action.rows;
				var	newLevel 	= newRows<=100 ? Math.floor(newRows/10)+1 : 10;
				var	pointAward 	= 100*(action.rows*(action.rows+2))/3;

				setTicker(newLevel);

				this.setState({
					rows: 			newRows,
					level: 			newLevel,
					arcadeScore: 	this.state.arcadeScore + pointAward
				})
			default:
				break;
		}
	}

	getState(){
		return this.state;
	}

}

export default new ScoreboardStore();
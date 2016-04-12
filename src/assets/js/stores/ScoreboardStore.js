import dispatcher from '../dispatcher';

class ScoreboardStore extends BaseStore {

	getInitialState(){
    	return this._emptyState();
    }

	_emptyState(){
		return {
			score: 	0,
			rows: 	0,
			level: 	0,
		}
	}

	register(action){
		switch(action.type){
			case "New Game":
				break;
			default:
				break;
		}
	}

	getScore(){
		return this.state.score;
	}

}

export default new PieceStore();
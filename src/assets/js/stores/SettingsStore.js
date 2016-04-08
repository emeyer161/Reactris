import BaseStore from './BaseStore';
import _ from 'lodash';

class SettingsStore extends BaseStore {

	getInitialState(){
    	return {
			boardWidth: 	'0px',
            boardHeight:	'0px',
            blocksWide: 	0,
            blocksTall: 	0,
            blockSize: 		0,
		}
    }

    register(action){
		switch(action.type){
			case "Settings Submitted":
				action.settings.blocksWide 	+=2;
				action.settings.blockSize 	= action.settings.boardWidth / action.settings.blocksWide;
				action.settings.blocksTall 	= Math.floor( action.settings.boardHeight / action.settings.blockSize );

				this.setState( action.settings );
				break;
			default:
				break;
		}
	}

	getBlockSize(){
		return this.state.blockSize;
	}

	getBoardSize(){
		return {
			width: this.state.blocksWide,
			height: this.state.blocksTall
		}
	}

}

export default new SettingsStore();
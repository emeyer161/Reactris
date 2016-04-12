import BaseStore from './BaseStore';
import _ from 'lodash';

class SettingsStore extends BaseStore {

	getInitialState(){
    	return {
    		gameBoard:{
    			width: 		'0px',
    			height: 	'0px',
    			blocksWide: 0,
            	blocksTall: 0,
    		},
    		dashBoard:{
    			width: 		'0px',
    			height: 	'0px',
    			blocksWide: 0,
            	blocksTall: 0,
    		},
            blockSize: 		0,
		}
    }

    register(action){
		switch(action.type){
			case "Settings Submitted":
				action.settings.gameBoard.blocksWide 	+=2;
				action.settings.blockSize 				= action.settings.gameBoard.width / action.settings.gameBoard.blocksWide;
				action.settings.gameBoard.blocksTall 	= Math.floor( action.settings.gameBoard.height / action.settings.blockSize );

				action.settings.dashBoard.blocksWide 	= Math.floor(action.settings.dashBoard.width / action.settings.blockSize);
				action.settings.dashBoard.blocksTall 	= action.settings.gameBoard.blocksTall;

				this.setState( action.settings );
				console.log(action.settings);
				break;
			default:
				break;
		}
	}

	getBlockSize(){
		return this.state.blockSize;
	}

	getGameBoardSize(){
		return {
			width: this.state.gameBoard.blocksWide,
			height: this.state.gameBoard.blocksTall
		}
	}

	getDashBoardSize(){
		return {
			width: this.state.dashBoard.blocksWide,
			height: this.state.dashBoard.blocksTall
		}
	}

}

export default new SettingsStore();
import BaseStore from './BaseStore';
import _ from 'lodash';

class SettingsStore extends BaseStore {

	getInitialState(){
    	return {
    		width: 		'0px',
    		height: 	'0px',
            blockSize: 	0,
		}
    }

    register(action){
		switch(action.type){
			case "Settings Submitted":
				if ((action.settings.height/action.settings.width) >= (22/17)){	// If component is taller than the ratio
					action.settings.blockSize 	= action.settings.width/17;
					action.settings.height 		= action.settings.blockSize*22;
				} else {														// If component is wider than the ratio
					action.settings.blockSize 	= action.settings.height/22;
					action.settings.width 		= action.settings.blockSize*17;
				}

				this.setState( action.settings );
				break;
			default:
				break;
		}
	}

	getBlockSize(){
		return this.state.blockSize;
	}

	getContainerSize(){
		return {
			width: 	this.state.width,
			height: this.state.height
		}
	}

}

export default new SettingsStore();
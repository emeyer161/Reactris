import BaseStore from './BaseStore';
import _ from 'lodash';

class SettingsStore extends BaseStore {

	getInitialState(){
    	return {
    		blockSize: 	0,
		}
    }

    register(action){
		switch(action.type){
			case "Settings Submitted":
				this.setState( action.settings );
				break;
			default:
				break;
		}
	}

	getBlockSize(){
		return this.state.blockSize;
	}

}

export default new SettingsStore();
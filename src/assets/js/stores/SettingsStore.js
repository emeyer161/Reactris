import BaseStore from './BaseStore';
import _ from 'lodash';

class SettingsStore extends BaseStore {

	getInitialState(){
    	return {
			width: 		'0px',
            height:		'0px',
            blocksWide: 0,
            blocksTall: 0,
            blockSize: 	0,
		}
    }

    register(action){
		switch(action.type){
			case "Settings Submitted":
				action.settings.blocksWide +=2;
				var blockWidth 	= action.settings.width/(action.settings.blocksWide);

				action.settings.blockSize 	= blockWidth;
				action.settings.blocksTall 	= Math.floor(action.settings.height/blockWidth);

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

	// separateUnits(str){
 //        str = str.replace(/\s/g, '');
 //        var unitIndex = _.findIndex(str.split(''), function(letter){
 //            return isNaN(parseInt(letter));
 //        });
 //        return {
 //            value:  parseInt(_.slice(str, 0, unitIndex).join('')),
 //            unit:   _.slice(str, unitIndex).join(''),
 //        }
 //    }

}

export default new SettingsStore();
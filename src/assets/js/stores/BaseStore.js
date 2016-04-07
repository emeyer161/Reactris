import dispatcher from '../dispatcher';
import Events from 'events';
// import { CHANGE } from '../constants';

class BaseStore extends Events.EventEmitter {
    
    constructor() {
        super();
        
        if(!this.register){
            console.error("It is required to define a register function when extending BaseStore.");
            return;
        }
        
		dispatcher.register(this.register.bind(this));
		
        this.getInitialState && (
            this.state = this.getInitialState()
        );

		this.storeDidMount && this.storeDidMount();
    }
    
    addChangeListener(cb){
        this.on("change", cb);
    }
    
    removeChangeListener(cb){
        this.removeListener("change", cb);
    }
    
    emitChange(){
        this.emit("change");
    }

    setState(newState){
        for(var key in newState) {
            if(newState.hasOwnProperty(key)) {
                this.state[key] = newState[key];
            }
        }
        this.emitChange();
    }
    
}

export default BaseStore;
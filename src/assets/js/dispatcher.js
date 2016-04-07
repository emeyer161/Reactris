class Dispatcher {
    
    constructor(){      // Initiates list of subscibers (listeners)
        this._listeners = [];
    }
    
    register(cb) {      // Adds new subscribers to list of listeners
        this._listeners.push(cb);
    }
    
    dispatch(action) {  // Publishes a new event for listeners to see
        this._listeners.forEach(function(cb){
            cb(action);
        });
    }
    
}

export default new Dispatcher();
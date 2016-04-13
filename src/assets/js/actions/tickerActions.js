import dispatcher from '../dispatcher';

var ticker = false;

export function setTicker(level){
	ticker && stopTicker();
	ticker = setInterval(function(){
        dispatcher.dispatch({
			type: "Timer Ticked"
		});
    },1000*.05*(11-level));
}

export function stopTicker(){
	clearInterval(ticker);
}
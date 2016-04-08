import dispatcher from '../dispatcher';

var ticker = false;
var interval = 0;

export function setTicker(sec){
	interval = sec;
	ticker && stopTicker();
	ticker = setInterval(function(){
        dispatcher.dispatch({
			type: "Timer Ticked"
		});
    },1000*sec);
}

export function quickerTicker(){
	setTicker(interval*2/3);
}

export function slowTicker(){
	setTicker(interval*3/2);
}

export function stopTicker(){
	clearInterval(ticker);
}


// export function clearTicker(sec){
// 	clearInterval(function(){
//         dispatcher.dispatch({
// 			type: "Timer Ticked"
// 		});
//     },1000*sec)
// }
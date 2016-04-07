import dispatcher from '../dispatcher';

export function newGame(){
	dispatcher.dispatch({
		type: "New Game"
	});
}

export function keyPressed(keyCode){
	dispatcher.dispatch({
		type: "User Input",
		movement: _decodeKeyPress(keyCode),
	});
}

function _decodeKeyPress(keyCode){
	switch(keyCode){
		case 37:
			return "left";
		case 38:
			return "rotate";
		case 39:
			return "right";
		case 40:
			return "down";
		default:
			console.log('Not a functional key');
			return "other";
	}
}

export function timerTick(){
	dispatcher.dispatch({
		type: "Timer Ticked"
	});
}
import dispatcher from '../dispatcher';

export function keyPressed(keyCode){
	if (keyCode === 78){
        dispatcher.dispatch({
			type: "New Game"
		});
    } else {
        dispatcher.dispatch({
			type: "User Input",
			movement: _decodeKeyPress(keyCode),
		});
    }
}

export function newGame(){
	dispatcher.dispatch({
		type: "New Game"
	});
}

function _decodeKeyPress(keyCode){
	switch(keyCode){
		case 13:
			return "lock";
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

export function submitSettings(settings){
	dispatcher.dispatch({
		type: "Settings Submitted",
		settings: settings
	});
}
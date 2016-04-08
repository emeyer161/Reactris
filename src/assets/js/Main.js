import React from 'react';
import ReactDOM from 'react-dom';

import { newGame, keyPressed } from './actions/userActions';
import { setTicker, quickerTicker, slowTicker } from './actions/driverActions';

import Piece from './containers/Piece';
import Landscape from './containers/Landscape';

export default class Application extends React.Component {
    constructor(){
        super();

        this.styles = {
            position:'absolute',
            width:'400px',
            height:'800px',
        }
    }

    _handleKeyPress(event){
        event.preventDefault();
        if(event.keyCode == 70){
            quickerTicker();
        } else if (event.keyCode == 83){
            slowTicker();
        }
        keyPressed(event.keyCode);
    }

    componentDidMount() {
        window.addEventListener("keydown", this._handleKeyPress.bind(this), false);
        setTicker(1);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyPress.bind(this), false);
    }

  	render(){
	    return  <div style={this.styles} >
                    <Landscape />
                    <Piece />
                </div>;
  	};
}
  
ReactDOM.render(<Application />, document.getElementById('app'));
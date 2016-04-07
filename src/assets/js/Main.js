import React from 'react';
import ReactDOM from 'react-dom';
// import Radium from 'radium';

import { newGame, keyPressed, timerTick } from './actions/actions';

import Piece from './containers/Piece';
import Landscape from './containers/Landscape';

export default class Application extends React.Component {
    constructor(){
        super();
        this.state = {

        };

        this.styles = {
            position:'absolute',
            width:'400px',
            height:'800px',
        }
    }

    _handleKeyPress(event){
        if (event.keyCode === 78){
            newGame();
        } else {
            keyPressed(event.keyCode);
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this._handleKeyPress.bind(this), false);
        setInterval(function(){
            timerTick();
        },1000)
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
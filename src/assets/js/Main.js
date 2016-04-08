import React from 'react';
import ReactDOM from 'react-dom';

// import _ from "lodash";

import { newGame, keyPressed } from './actions/userActions';
import { submitSettings, setTicker, quickerTicker, slowTicker } from './actions/driverActions';

import Piece from './containers/Piece';
import Landscape from './containers/Landscape';

import SettingsStore from './stores/SettingsStore';

export default class Application extends React.Component {
    constructor(){
        super();

        this.styles = {
            container:{
                position:'relative',
                width:'100%',
                height:'100%'
            },
            gameboard:{
                position:'absolute',
                width:'70%',
                height:'100%',
            },
            gameborder:{
                position:'absolute',
                width:'100%',
                height:'100%',
                boxSizing:'border-box',
                border:'0px solid green'
            },
            scoreboard:{
                position:'absolute',
                right:'0px',
                width:'30%',
                height:'100%'
            }
        }

        this._update = this._update.bind(this);
    }

    _handleKeyPress(event){
        event.preventDefault();
        if(event.keyCode == 70){
            quickerTicker();
        } else if (event.keyCode == 83){
            slowTicker();
        }
        keyPressed(event.keyCode)
    }

    componentDidMount() {
        window.addEventListener("keydown", this._handleKeyPress.bind(this), false);
        setTicker(1);
        SettingsStore.addChangeListener(this._update);

        submitSettings({
            width:  document.getElementById('gameBoard').clientWidth,
            height: document.getElementById('gameBoard').clientHeight,
            blocksWide:9
        });
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyPress.bind(this), false);
        SettingsStore.removeChangeListener(this._update);
    }

    _update(){
        this.styles.gameborder.border = SettingsStore.getBlockSize() + 'px solid green';
        this.render();
    }

  	render(){
        console.log(this.styles.gameborder.border);
	    return  <div id='Reactris' style={this.styles.container} >
                    <div id='gameBoard' style={this.styles.gameboard} >
                        <div id='gameBorder' style={this.styles.gameborder} ></div>
                        <Landscape />
                        <Piece />
                    </div>
                    <div id='scoreBoard' style={this.styles.scoreboard} >
                    </div>
                </div>;
  	};
}
  
ReactDOM.render(<Application />, document.getElementById('app'));
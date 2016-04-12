import React from 'react';
import ReactDOM from 'react-dom';

// import _ from "lodash";

import { newGame, keyPressed } from './actions/userActions';
import { submitSettings, setTicker, quickerTicker, slowTicker } from './actions/driverActions';

import Piece from './containers/Piece';
import Ghost from './containers/Ghost';
import NextPiece from './containers/NextPiece';
import Landscape from './containers/Landscape';

import SettingsStore from './stores/SettingsStore';

export default class Application extends React.Component {
    constructor(){
        super();

        this.styles = {
            container:{
                position:'relative',
                width:'100%',
                height:'100%',
                backgroundColor:'AliceBlue'
            },
            gameboard:{
                position:'absolute',
                width:'60%',
                height:'100%',
            },
            dashBoard:{
                position:'absolute',
                right:'0px',
                width:'40%',
                height:'100%',
            },
            onDeck:{
                position:'absolute',
                top:'0px',
                right:'0',
                width:'100%',
                height:'50%',
            },
            scoreBoard:{
                position:'absolute',
                bottom:'0px',
                width:'100%',
                height:'50%',
                textAlign:'center'
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

        submitSettings({
            gameBoard:{
                width:  document.getElementById('gameBoard').clientWidth,
                height: document.getElementById('gameBoard').clientHeight,
                blocksWide:10
            },
            dashBoard:{
                width:  document.getElementById('dashBoard').clientWidth,
                height: document.getElementById('dashBoard').clientHeight,
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyPress.bind(this), false);
    }

    _update(){

    }

  	render(){
	    return  <div id='Reactris' style={this.styles.container} >
                    <div id='gameBoard' style={this.styles.gameboard} >
                        <Landscape />
                        <Piece />
                        <Ghost />
                    </div>
                    <div id='dashBoard' style={this.styles.dashBoard} >
                        <div id='onDeck' style={this.styles.onDeck} >
                            <NextPiece />
                        </div>
                        <div id='scoreBoard' style={this.styles.scoreBoard} >
                            scoreboard
                        </div>
                    </div>
                </div>;
  	};
}
  
ReactDOM.render(<Application />, document.getElementById('app'));
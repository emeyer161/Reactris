import React from 'react';
import ReactDOM from 'react-dom';

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

        this.state = {
            position:'relative',
            width:'100%',
            height:'100%',
            margin:'auto',
            backgroundColor:'AliceBlue'
        }

        this.styles = {
            gameBoard:{
                position:'absolute',
                width:11/17*100+'%',
                height:'100%',
            },
            dashBoard:{
                position:'absolute',
                right:'0px',
                width:6/17*100+'%',
                height:'100%',
            },
            onDeck:{
                position:'absolute',
                top:'0px',
                right:'0',
                width:'100%',
                height:8/22*100+'%',
            },
            scoreBoard:{
                position:'absolute',
                bottom:'0px',
                width:'100%',
                height:14/22*100+'%',
                textAlign:'center'
            }
        }

        this._updateContainerSizes = this._updateContainerSizes.bind(this);
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
        setTicker(1);

        SettingsStore.addChangeListener(this._updateContainerSizes);
        this._submitContainerSizes();
        window.addEventListener("resize", function(){
            this._submitContainerSizes();
        }.bind(this), true);

        window.addEventListener("keydown", this._handleKeyPress.bind(this), false);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyPress.bind(this), false);
        SettingsStore.removeChangeListener(this._updateContainerSizes);
    }

    _submitContainerSizes(){
        submitSettings({
            width:  document.getElementById('Reactris').parentNode.clientWidth,
            height: document.getElementById('Reactris').parentNode.clientHeight
        });
    }

    _updateContainerSizes(){
        this.setState(SettingsStore.getContainerSize());
    }

  	render(){
	    return  <div id='Reactris' style={this.state} >
                    <div id='gameBoard' style={this.styles.gameBoard} >
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
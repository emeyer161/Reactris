import React from 'react';
import ReactDOM from 'react-dom';

import { submitSettings, newGame, movement, keyPressed } from './actions/userActions';

import Piece from './containers/Piece';
import Ghost from './containers/Ghost';
import NextPiece from './containers/NextPiece';
import Landscape from './containers/Landscape';
import ScoreBoard from './containers/ScoreBoard';

import SettingsStore from './stores/SettingsStore';

export default class Application extends React.Component {
    constructor(){
        super();

        this.state ={
            position: 'relative',
            margin:'auto',
            touchEnabled: (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
        }

        this.styles = {
            Reactris:{
                position:'relative',
                width:'100%',
                height:'100%',
                boxSizing:'border-box',
                padding:'.5%',
                backgroundColor:'#252840',
                fontFamily:'Sans-Serif'
            },
            outerContainer:{
                width:'100%',
                height:'100%'
            },
            gameBoard:{
                position:'absolute',
                width:1025/15+'%',
                height:'100%',
                boxSizing:'border-box',
                backgroundColor:'#4A4F7F'
            },
            dashBoard:{
                position:'absolute',
                right:'0px',
                width:400/15+'%',
                marginLeft:75/15+'%',
                height:'100%'
            },
            onDeck:{
                position:'relative',
                display:'block',
                width:'95%',
                height:'25%',
                boxSizing:'border-box',
                backgroundColor:'#7077BF'
            },
            scoreBoard:{
                position:'relative',
                display:'block',
                width:'100%',
                height:'65%',
                textAlign:'center'
            },
            newGame:{
                position:'relative',
                display:'block',
                width:'100%',
                height:'10%',
                boxSizing:'border-box',
                padding:'5%'

            },
            button:{
                height:'100%',
                width:'100%',
                border: '0px',
                borderRadius:'7px',
                backgroundColor:'white',
                color:'black'
            }
        }
    }

    _handleKeyPress(event){
        keyPressed(event.keyCode)
    }

    componentDidMount() {
        this._resize();
        window.addEventListener("resize", function(){
            this._resize();
        }.bind(this), true);

        window.addEventListener("keydown", this._handleKeyPress.bind(this), false);
        this.state.touchEnabled && this.initiateTouchHandlers();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyPress.bind(this), false);
    }

    initiateTouchHandlers(){
        this.touchsurface = document.getElementById('gameBoard'),
        this.startX, this.startY, this.distX,
        this.threshold = 100, //required min distance traveled to be considered swipe
        this.startTime,
        this.allowedTime = 600, // maximum time allowed to travel that distance
        this._handleSwipe = function(direction){
            movement(direction);
        }

        this.touchsurface.addEventListener('touchstart', function(e){
            e.preventDefault();
            this.startObj = e.changedTouches[0];
            this.startX = this.startObj.pageX;
            this.startY = this.startObj.pageY;
            this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
        }.bind(this), false)
     
        this.touchsurface.addEventListener('touchend', function(e){
            e.preventDefault();
            this.endObj = e.changedTouches[0];
            if (new Date().getTime() - this.startTime <= this.allowedTime){  // check that elapsed time is within allowed
                if((Math.abs(this.endObj.pageX - this.startX) >= this.threshold) &&    // check that swipe distance was long enough
                    (Math.abs(this.endObj.pageY - this.startY) <= 50)) {
                        this.endObj.pageX - this.startX > 0       // calculate swipe direction
                            ? this._handleSwipe('right')
                            : this._handleSwipe('left')
                } else if ((Math.abs(this.endObj.pageY - this.startY) >= this.threshold) &&    // check that swipe distance was long enough
                    (Math.abs(this.endObj.pageX - this.startX) <= 50)) {
                        this.endObj.pageY - this.startY > 0       // calculate swipe direction
                            ? this._handleSwipe('rotate')
                            : this.startY - this.endObj.pageY > this.threshold*2
                                ? this._handleSwipe('lock')
                                : this._handleSwipe('down')
                }
            }
        }.bind(this), false)
    }

    _resize(){
        var width   = document.getElementById('outerContainer').clientWidth,
            height  = document.getElementById('outerContainer').clientHeight,
            blockSize;

        if ( height/width  >= 20.25/15){ // If component is taller than the ratio
            blockSize   = width/15;
            height      = width*20.25/15;
        } else {                      // If component is wider than the ratio
            blockSize   = height/20.25;
            width       = height*15/20.25;
        }

        this.styles.gameBoard.border = blockSize/8+'px #959FFF ridge';
        this.styles.onDeck.border = blockSize/8+'px #959FFF ridge';

        this.setState({
            width:      width+'px',
            height:     height+'px'
        })

        submitSettings({ blockSize: blockSize});
    }

    _handleButton(){
        newGame();
    }

  	render(){
	    return  <div id='Reactris' style={this.styles.Reactris} >
                    <div id='outerContainer' style={this.styles.outerContainer}>
                        <div id='innerContainer' style={this.state}>
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
                                    <ScoreBoard />
                                </div>
                                <div style={this.styles.newGame}>
                                    <button onClick={this._handleButton} style={this.styles.button}>New Game</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
  	};
}
  
ReactDOM.render(<Application />, document.getElementById('app'));
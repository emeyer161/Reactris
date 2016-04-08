import React from 'react';
import Radium from 'radium';

class Block extends React.Component {
  	constructor(props){
		super(props);

		this.styles = {
			position: 	'absolute',
			width: 		this.props.size+'px',
			height: 	this.props.size+'px',
			boxSizing: 	'border-box',
			border: 	'2px black solid',
			backgroundColor: this.props.color,
		}
	}

	_getLocation(){
		return {
			left: 	this.props.location.X*this.props.size+'px',
  			top: 	this.props.location.Y*this.props.size+'px'
		}
	}

  	render(){return  <div style={[this.styles, this._getLocation()]}> </div>;
  	}
}

export default Radium(Block);
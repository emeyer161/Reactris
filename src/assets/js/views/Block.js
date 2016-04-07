import React from 'react';
import Radium from 'radium';

class Block extends React.Component {
  	constructor(props){
		super(props);

		this.styles = {
			position:'absolute',
			width:'40px',
			height:'40px',
			boxSizing:'border-box',
			border:'2px black solid',
			backgroundColor: 'blue'
		}
	}

  	render(){
  		let newStyles = {
  			left: 	this.props.location.X*40 + 'px',
  			top: 	this.props.location.Y*40 + 'px'
  		}

	    return  <div style={[this.styles, newStyles]}> </div>;
  	}
}

export default Radium(Block);
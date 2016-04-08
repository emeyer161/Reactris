import React from 'react';
import Radium from 'radium';

class Block extends React.Component {
  	constructor(props){
		super(props);

		this.styles = {
			position: 		'absolute',
			width: 			this.props.size+'px',
			height: 		this.props.size+'px',
			boxSizing: 		'border-box',
			borderRadius: 	'10%'
		}
	}

	_getQualities(){
		return {
			left: 	(this.props.qualities.X-1)*this.props.size+'px',
  			top: 	(this.props.qualities.Y-1)*this.props.size+'px',
  			backgroundColor: this.props.qualities.color,
  			border: this.props.size/10+'px '+this.props.qualities.color+' outset'
		}
	}

  	render(){
  		return  <div className='block' style={[this.styles, this._getQualities()]}> </div>;
  	}
}

export default Radium(Block);
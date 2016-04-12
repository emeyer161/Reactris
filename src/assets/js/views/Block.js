import React from 'react';
import Radium from 'radium';

import SettingsStore from '../stores/SettingsStore';

class Block extends React.Component {
  	constructor(props){
		super(props);

		this.styles = {
			position: 		'absolute',
			boxSizing: 		'border-box',
			borderRadius: 	'10%'
		}
	}

	_getQualities(){
		return {
			width: 	this.props.size+'px',
			height: this.props.size+'px',
			left: 	(this.props.qualities.X-1)*this.props.size+'px',
  			top: 	(this.props.qualities.Y-1)*this.props.size+'px',
  			border: this.props.size/10+'px '+this.props.qualities.color+' outset',
  			backgroundColor: this.props.qualities.color,
		}
	}

  	render(){
  		return  <div className='block' style={[this.styles, this._getQualities()]}> </div>;
  	}
}

export default Radium(Block);
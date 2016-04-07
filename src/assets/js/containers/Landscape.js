import React from 'react';
import Block from '../views/Block';

import LandscapeStore from '../stores/LandscapeStore';
import PieceStore from '../stores/PieceStore';

var styles = {

};

class Landscape extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			locations: []
		}

		this.styles = {
			position:'absolute',
			width:'100%',
			height:'100%',
		}

		this._update = this._update.bind(this);
	}
	
	componentWillMount(){
		LandscapeStore.addChangeListener(this._update);
		this._update();
	}


	componentWillUnmount() {
		LandscapeStore.removeChangeListener(this._update);
	}

	_update(){
		this.setState({
			locations: LandscapeStore.getBlockLocations()
		})
	}

  	render(){
	    return  <div style={this.styles} >
	    			{this.state.locations.map(function(b,i){
	    				return <Block key={'Landscape '+i} location={b} />
	    			}.bind(this))}
	            </div>;
  	}
}

export default Landscape;

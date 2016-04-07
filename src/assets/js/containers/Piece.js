import React from 'react';
import Block from '../views/Block';

import PieceStore from '../stores/PieceStore';

var styles = {

};

class Piece extends React.Component {
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
		PieceStore.addChangeListener(this._update);
		this._update();
	}


	componentWillUnmount() {
		PieceStore.removeChangeListener(this._update);
	}

	_update(){
		this.setState({
			locations: PieceStore.getBlockLocations()
		})
	}

  	render(){
	    return  <div style={this.styles} >
	    			{this.state.locations.map(function(b,i){
	    				return <Block key={'Block #'+i} location={b} />
	    			}.bind(this))}
	            </div>;
  	}
}

export default Piece;

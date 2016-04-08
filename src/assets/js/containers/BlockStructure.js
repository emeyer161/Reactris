import React from 'react';
import Block from '../views/Block';

class BlockStructure extends React.Component {
  	constructor(props){
		super(props);

		this.state = {
			locations: [],
			color: 'gray'
		}

		this.styles = {
			position:'absolute',
			width:'100%',
			height:'100%',
		}

		this._update = this._update.bind(this);
	}
	
	componentDidMount(){
		this.bindStore.addChangeListener(this._update);
		this._update();
	}


	componentWillUnmount() {
		this.bindStore.removeChangeListener(this._update);
	}

	_update(){
		this.setState({
			locations: this.bindStore.getBlockLocations(),
			color: this._getColor() || 'gray'
		});
	}

  	render(){
	    return  <div style={this.styles} >
	    			{this.state.locations.map(function(b,i){
	    				return <Block key={this.state.color+i} location={b} color={this.state.color} size={40} />
	    			}.bind(this))}
	            </div>;
  	}
}

export default BlockStructure;
import React from 'react';
import Radium from 'radium';
import Block from '../views/Block';

import SettingsStore from '../stores/SettingsStore';

class BlockStructure extends React.Component {
  	constructor(props){
		super(props);

		this.state = {
			locations: [],
			color: 'gray',
			size:'0px'
		}

		this.defaultStyles = {
			position:'absolute',
			width:'100%',
			height:'100%',
		}

		this._updateLocation = this._updateLocation.bind(this);
		this._updateSize = this._updateSize.bind(this);
	}
	
	componentDidMount(){
		SettingsStore.addChangeListener(this._updateSize);
		this.bindLocationStore.addChangeListener(this._updateLocation);
		this._updateLocation();
	}

	componentWillUnmount() {
		SettingsStore.removeChangeListener(this._updateSize);
		this.bindLocationStore.removeChangeListener(this._updateLocation);
	}

	_updateLocation(){
		this.setState({
			locations: this.bindLocationStore.getBlockLocations(),
			color: this._getColor() || 'gray'
		});
	}

	_updateSize(){
		this.setState({
			size: SettingsStore.getBlockSize()
		});
	}

  	render(){
	    return  <div style={[this.defaultStyles, this.styles || {}]} >
	    			{this.state.locations.map(function(b,i){
	    				return <Block key={this.state.color+i} location={b} color={this.state.color} size={this.state.size} />
	    			}.bind(this))}
	            </div>;
  	}
}

export default Radium(BlockStructure);
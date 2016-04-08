import React from 'react';
import Radium from 'radium';
import Block from '../views/Block';

import SettingsStore from '../stores/SettingsStore';

class BlockStructure extends React.Component {
  	constructor(props){
		super(props);

		this.state = {
			blocks: [],
			size:'0px'
		}

		this.defaultStyles = {
			position:'absolute',
			width:'100%',
			height:'100%',
		}

		this._updateBlocks = this._updateBlocks.bind(this);
		this._updateSize = this._updateSize.bind(this);
	}
	
	componentDidMount(){
		SettingsStore.addChangeListener(this._updateSize);
		this.bindLocationStore.addChangeListener(this._updateBlocks);
		this._updateBlocks();
	}

	componentWillUnmount() {
		SettingsStore.removeChangeListener(this._updateSize);
		this.bindLocationStore.removeChangeListener(this._updateBlocks);
	}

	_updateBlocks(){
		this.setState({
			blocks: this.bindLocationStore.getBlocks(),
		});
	}

	_updateSize(){
		this.setState({
			size: SettingsStore.getBlockSize()
		});
	}

  	render(){
  		console.log(this.styles);
	    return  <div style={[this.defaultStyles, this.styles || {}]} >
	    			{this.state.blocks.map(function(b,i){
	    				return <Block key={i} qualities={b} size={this.state.size} />
	    			}.bind(this))}
	            </div>;
  	}
}

export default Radium(BlockStructure);
import React from 'react';
import Radium from 'radium';
import Score from '../views/Score';

import ScoreboardStore from '../stores/ScoreboardStore';
import SettingsStore from '../stores/SettingsStore';

class ScoreBoard extends React.Component {
  	constructor(props){
		super(props);

		this.state = ScoreboardStore.getState();

		this.styles = {
			width: '100%',
			height: '100%',
			size: '0px'
		}

		this._updateScore = this._updateScore.bind(this);
		this._updateSize = this._updateSize.bind(this);
	}
	
	componentDidMount(){
		SettingsStore.addChangeListener(this._updateSize);
		ScoreboardStore.addChangeListener(this._updateScore);
		this._updateScore();
	}

	componentWillUnmount() {
		SettingsStore.removeChangeListener(this._updateSize);
		ScoreboardStore.removeChangeListener(this._updateScore);
	}

	_updateScore(){
		this.setState( ScoreboardStore.getState() );
	}

	_updateSize(){
		this.setState({ size: SettingsStore.getBlockSize() });
	}

  	render(){
	    return  <div style={this.styles}>
	    			<Score title='Level' score={Math.ceil(this.state.level)} size={this.state.size} />
	    			<Score title='Rows' score={Math.ceil(this.state.rows)} size={this.state.size} />
	    			<Score title='Arcade' score={Math.ceil(this.state.arcadeScore)} size={this.state.size} />
	    			<Score title='Standard' score={Math.ceil(this.state.standardScore)} size={this.state.size} />
	            </div>;
  	}
}

export default Radium(ScoreBoard);
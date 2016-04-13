import React from 'react';
import Radium from 'radium';

class Block extends React.Component {
  	constructor(props){
		super(props);

		this.styles = {
			main:{
				display: 'block',
				width: 	'100%',
				height: '25%',
			},
			title:{
				display:'block',
				width:'100%',
				height:'40%',
				color:'white'
			},
			score:{
				display:'block',
				width:'90%',
				height:'55%',
				boxSizing:'border-box',
				border:'1px ridge #4A4F7F',
				margin:'0 5% 5% 5%',
				backgroundColor:'#959FFF',
				color:'black'
			}
		}
	}

  	render(){
  		return  <div className='block' style={this.styles.main}>
  					<div style={[this.styles.title, {fontSize: this.props.size}]}>{this.props.title}</div>
  					<div style={[this.styles.score, {fontSize: this.props.size}]}>{this.props.score}</div>
  				</div>;
  	}
}

export default Radium(Block);
import React from 'react';
import BlockStructure from './BlockStructure';

import LandscapeStore from '../stores/LandscapeStore';

class Landscape extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = LandscapeStore;

		this.styles = {
			// boxSizing:'border-box',
			// border: '40px green',
			// borderTop: 'none'
		}
	}

	_getColor(){
		return "gray";
	}
}

export default Landscape;

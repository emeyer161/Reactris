import React from 'react';
import BlockStructure from './BlockStructure';

import LandscapeStore from '../stores/LandscapeStore';

class Landscape extends BlockStructure {

	constructor(){
		super();
		this.bindStore = LandscapeStore;
	}

	_getColor(){
		return "gray";
	}
}

export default Landscape;

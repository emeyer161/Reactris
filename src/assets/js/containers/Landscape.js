import React from 'react';
import BlockStructure from './BlockStructure';

import LandscapeStore from '../stores/LandscapeStore';

class Landscape extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = LandscapeStore;
	}

}

export default Landscape;

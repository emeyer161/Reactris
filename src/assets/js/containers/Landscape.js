import React from 'react';
import BlockStructure from './BlockStructure';

import LandscapeStore from '../stores/LandscapeStore';

class Landscape extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = LandscapeStore;

		this.styles = {
			backgroundColor:'AliceBlue'
		}
	}

}

export default Landscape;

import React from 'react';
import BlockStructure from './BlockStructure';

import GhostStore from '../stores/GhostStore';

class Ghost extends BlockStructure {

	constructor(){
		super();
		this.bindLocationStore = GhostStore;

		this.styles = {
			opacity: .3
		}
	}

}

export default Ghost;


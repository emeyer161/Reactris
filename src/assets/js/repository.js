import LandscapeStore from './stores/LandscapeStore';

export function modifyBlock(block, modifier){
	var modBlock = {};
	modBlock.X = block.X + (modifier.X ?modifier.X :0 );
	modBlock.Y = block.Y + (modifier.Y ?modifier.Y :0 );
	(block.color || modifier.color) && (modBlock.color = modifier.color || block.color);

	return modBlock;
}

export function modifyBlocks(blocks, modifier){
	var modBlocks =[];
	blocks.map(function(b){
		modBlocks.push(modifyBlock(b, modifier));
	})
	return modBlocks;
}

export function lockBlocks(blocks){
	while (LandscapeStore.isSpaceEmpty(modifyBlocks(blocks, {Y:1}))){
		blocks = modifyBlocks(blocks, {Y:1})
	}
	return blocks;
}
import Box from '../../../models/box.js';

const boxMutations = {
	addBox: async ( _, { box }) => {
		let newBox = new Box( box );
		return newBox.save();
	},
};

export default boxMutations;
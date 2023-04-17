import Box from '../../../models/box.js';

const boxQueries = {
	boxes: async () => {
		return Box.find();
	},

	box: async ( _, { id }) => {
		return Box.findById( id );
	}
};

export default boxQueries;
import Vendor from '../../../models/vendor.js';

const vendorQueries = {
	vendors: async () => {
		return Vendor.find();
	},
    
	vendor: async ( _, { id }) => {
		return Vendor.findById( id );
	},

	vendorByShortHand: async ( _, { shortHand }) => {
		return Vendor.findOne({ shortHand: { $eq: shortHand } });
	}
};

export default vendorQueries;
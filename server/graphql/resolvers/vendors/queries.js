import Vendor from '../../../models/vendor.js';

const vendorQueries = {
	vendors: async () => {
		return Vendor.find();
	},
    
	vendor: async ( _, { id }) => {
		return Vendor.findById( id );
	}
};

export default vendorQueries;
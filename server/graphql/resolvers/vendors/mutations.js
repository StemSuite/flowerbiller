import Vendor from '../../../models/vendor.js';

const vendorMutations = {
	addVendor: async( _, { vendor }) => {
		let newVendor = new Vendor( vendor );
		return newVendor.save();
	}
};

export default vendorMutations;
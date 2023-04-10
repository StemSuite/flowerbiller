import Vendor from '../../../models/vendor.js';

const vendorMutations = {
	addVendor: async( _, { vendor }) => {
		let newVendor = new Vendor( vendor );
		return newVendor.save();
	},

	addVendorShippingMethod: async( _, { id, shippingMethod }) => {
		return Vendor.findByIdAndUpdate( id, 
			{ $push: { shippingMethods: shippingMethod } },
		);
	},

	removeVendorShippingMethod: async( _, { id, shippingMethod }) => {
		return Vendor.findByIdAndUpdate( id, 
			{ $pull: { shippingMethods: { name: { $eq: shippingMethod.name } } } },
		);
	},
};

export default vendorMutations;
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

	addVendorBox: async( _, { id, box }) => {
		return Vendor.findByIdAndUpdate( id, 
			{ $push: { boxes: box } },
		);
	},

	removeVendorBox: async( _, { id, boxType }) => {
		return Vendor.findByIdAndUpdate( id, 
			{ $pull: { boxes: { type: { $eq: boxType } } } },
		);
	},

	updateVendorBoxCBF: async( _, { id, box }) => {
		return Vendor.findByIdAndUpdate( id, 
			{ 'boxes.$[element].CBF': box.CBF },
			{
				arrayFilters: [{ 'element.type': { $eq: box.type } }]
			}
		);
	},

};

export default vendorMutations;
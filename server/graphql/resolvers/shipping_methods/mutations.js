import ShippingMethod from '../../../models/shipping_method.js';

const shippingMethodMutations = {
	addShippingMethod: async ( _, { shippingMethod }) => {
		let newShippingMethod = new ShippingMethod ( shippingMethod );
		return newShippingMethod.save();
	}
};

export default shippingMethodMutations;
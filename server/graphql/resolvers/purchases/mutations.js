import Purchase from '../../../models/purchase.js';

const purchaseMutations = {
	addSOPurchase: async ( newPurchase ) => {
		return new Purchase ( newPurchase ).save();
	}
};

export default purchaseMutations;
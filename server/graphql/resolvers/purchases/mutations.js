import Purchase from '../../../models/purchase.js';

const purchaseMutations = {
	addPurchase: async ( newPurchase ) => {
		if ( !newPurchase.inventory ) newPurchase.inventory = newPurchase.item.totalQty;
		return new Purchase ( newPurchase ).save();
	}
};

export default purchaseMutations;
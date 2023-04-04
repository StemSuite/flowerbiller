/* eslint-disable no-undef */
import Purchase from '../../../models/purchase.js';
import Sale from '../../../models/sale.js';
import moment from 'moment';

function formatDate( date ) {
	return moment.utc( new Date( date ) ).toISOString();
}

const purchaseMutations = {
	addPurchase: async ( newPurchase ) => {
		if ( !newPurchase.inventory ) newPurchase.inventory = newPurchase.item.totalQty;
		let insertedPurchase = await new Purchase ( newPurchase ).save();
		let currentInventory = insertedPurchase.inventory;

		let updateSales = true;
		while ( updateSales ) {
			updateSales = await Sale.findOneAndUpdate(
				{
					dateSold: { $gte: formatDate( insertedPurchase.arrivalDate ) , $lte: formatDate( insertedPurchase.expirationDate ) },
					filledFrom: null,
					'item.product': { $eq: insertedPurchase.item.product },
					'item.variety': { $eq: insertedPurchase.item.variety },
					'item.quantity': { $lte: insertedPurchase.inventory }
				},
				{
					$set: { filledFrom: insertedPurchase._id },
				},
				{
					$sort: { soldDate: 1, quantity: -1 }
				}
			).then( updatedDoc => {
				if ( updatedDoc ) {
					currentInventory -= updatedDoc.item.quantity;
				}
				return updatedDoc;
			});
		}

		return Purchase.findByIdAndUpdate( insertedPurchase._id,
			{ $set: { inventory: currentInventory } }
		);
	}
};

export default purchaseMutations;
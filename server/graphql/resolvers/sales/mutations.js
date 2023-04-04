/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Sale from '../../../models/sale.js';
import Purchase from '../../../models/purchase.js';
import moment from 'moment';


const saleMutations = {
	addSale: async (  newSale ) => {
		if ( !newSale.item.size ) newSale.item.size = '';
		let dateSold =  new Date( newSale.dateSold );
		return Purchase.findOneAndUpdate(
			{ 
				expirationDate: { $gte: dateSold },
				arrivalDate: { $lte: dateSold },
				'item.product': { $eq: newSale.item.product },
				'item.variety':  { $eq: newSale.item.variety },
				'item.size': { $eq: newSale.item.size },
				'item.uom': { $eq: newSale.item.uom },
				inventory: { $gte: newSale.item.quantity },
			},
			{ $inc: { inventory: ( newSale.item.quantity * -1 ) } },
			{
				sort : { arrivalDate : 1, inventory: -1 },
				returnDocument: 'after',
				projection: { _id: 1 }
			}
		)
			.then( purchase => {
				if ( purchase ) {
					newSale.filledFrom = purchase._id;
				}
				return new Sale( newSale ).save();
			}); 
	}
};

export default saleMutations;  
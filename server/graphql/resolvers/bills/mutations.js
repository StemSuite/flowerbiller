import Bill from '../../../models/bill.js';
import Sale from '../../../models/sale.js';

const billMutations = {

	addBill: async ( _, { newBill }) => {
		return new Bill( newBill ).save();
	},

	updateSaleQty: async ( _ , { sale }) => {
		sale.dateSold = new Date ( sale.dateSold );
		if ( sale.item.quantity === 0 ) {
			return Sale.deleteMany(
				{
					billID: sale.billID,
					'item.product': sale.item.product,
					'item.variety': sale.item.variety,
					'item.size': sale.item.size
				}

			);
		}
		return Sale.findOneAndUpdate(
			{
				billID: sale.billID,
				store: sale.store,
				dateSold: sale.dateSold,
				'item.product': sale.item.product,
				'item.variety': sale.item.variety,
				'item.size': sale.item.size
			},
			{ 'item.quantity': sale.item.quantity },
			{ 
				upsert: true,
				returnDocument: 'after',
				sort: { updatedAt: 1 },
			}
		);
	},
    
};

export default billMutations;
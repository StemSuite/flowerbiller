/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
import Purchase from '../../../models/purchase.js';

const purchasesQueries = {
	inventory: async ( _, { date }) => {
		date = new Date( date );
		return Purchase.aggregate( [
			{ $match:{ arrivalDate: { $lte: date }, expirationDate: { $gt: date } } },
			{ $group: {
				_id: { product: '$item.product', variety: '$item.variety', size: '$item.size', uom: '$item.uom' },
				qtyAvailable: { $sum: '$inventory' },
			} },
			{ $project: 
                {
                	_id: 0,
                	product: '$_id.product',
                	variety: '$_id.variety',
                	size: '$_id.size',
                	uom: '$_id.uom',
                	qtyAvailable: 1
                }
			}
		] );
	},

};

export default purchasesQueries;
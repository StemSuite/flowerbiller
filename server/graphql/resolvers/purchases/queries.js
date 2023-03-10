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
				quantity: { $sum: '$item.totalQty' },
				minArriv: { $min: '$arrivalDate' },
				maxExp: { $max: '$expirationDate' }
			} },
			{ $lookup: {
				from: 'sales',
				let: { product: '$_id.product', variety: '$_id.variety', size: '$_id.size', minArriv: '$minArriv', maxExp: '$maxExp' },
				pipeline: [
					{ $match:
                        { $expr:
                            { $and:
                                [
                                	{ $eq: [ '$item.product', '$$product' ] },
                                	{ $eq: [ '$item.variety', '$$variety' ] },
                                	{ $eq: [ '$item.size', '$$size' ] },
                                	{ $gte: [ '$dateSold' , { '$toDate' :'$$minArriv' }  ] },
                                	{ $lte: [ '$dateSold', { '$toDate' :'$$maxExp' } ] }
                                ]
                            }
                        }
					},
					{ $group: {
						_id: { product: '$item.product', variety: '$item.variety', size: '$item.size' },
						quantity: { $sum: '$item.quantity' },
					} },
				],
				as: 'soldItems'
			} },
			{ $project: 
                {
                	_id: 0,
                	product: '$_id.product',
                	variety: '$_id.variety',
                	size: '$_id.size',
                	uom: '$_id.uom',
                	qtyAvailable: { $subtract: [ '$quantity', { $sum: '$soldItems.quantity' } ] }
                }
			}
		] );
	},

};

export default purchasesQueries;
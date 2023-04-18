import Bill from '../../../models/bill.js';
import Purchase from '../../../models/purchase.js';

const billQueries = {
	bills: async () => {
		return Bill.find (
			{},
			{
				store: 1,
				markUpPercent: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } }
			}
		);
	},

	bill: async ( _, { id }) => {
		return Bill.findById( id,
			{
				store: 1,
				markUpPercent: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } }
			}
		);
	},

	billInventory: async( _, { date, billID }) => {
		date = new Date ( date );
		return Purchase.aggregate( [
			{ $match:{ arrivalDate: { $lte: date }, expirationDate: { $gt: date } } },
			{ $group: {
				_id: { product: '$item.product', variety: '$item.variety', size: '$item.size', uom: '$item.uom' },
				totalLandedPrice: { $sum: '$landedPrice' }, 
				totalQty: { $sum: '$item.totalQty' } 
			} },
			{ $lookup: {
				from: 'sales',
				let: { product: '$_id.product', variety: '$_id.variety', size: '$_id.size' },
				pipeline: [
					{ $match: 
								{ $expr: 
									{ $and:
										[
											{ $eq: [ '$billID', { $toObjectId: billID } ] }, 
											{ $eq: [ '$item.product', '$$product' ] }, 
											{ $eq: [ '$item.variety', '$$variety' ] },
											{ $eq: [ '$item.size', '$$size' ] },
										]
									}
								}
					},
					{ $sort: { updatedAt: 1 } },
					{ $limit: 1 },
					{ $project: { _id: 0, saleID: '$_id', qtySold: '$item.quantity' }, }
				],
				as: 'sold'
			} },
			{ $project: { _id: 0, item: '$_id', soldQty: '$sold', avgLandedPrice: { $divide: [ '$totalLandedPrice', '$totalQty' ] } } }
		] );
	},

};

export default billQueries;
import StandingOrder from '../../../models/standing_order.js';

const standingOrderQueries = {
	standingOrders: async () => {
		return StandingOrder.aggregate( [
			{ $project: {
				venSH: 1,
				shipSH: 1,
				shippingDay: 1,
				startDate: 1,
				fstartDate: { $dateToString: { format: '%m/%d/%Y', date: '$startDate' } },
				fendDate: { $dateToString: { format: '%m/%d/%Y', date: '$endDate' } },
				itemCount: { '$sum': { '$size': '$items' } }
			}
			},
			{ $sort : { startDate : -1 } }
		] );
	},
    
	standingOrder: async ( _, { id }) => {
		return StandingOrder.findById( id,
			{
				venSH: 1,
				shipSH: 1,
				shippingDay: 1,
				items: 1,
				fstartDate: { $dateToString: { format: '%m/%d/%Y', date: '$startDate' } },
				fendDate: { $dateToString: { format: '%m/%d/%Y', date: '$endDate' } },
			});
	},

};

export default standingOrderQueries;
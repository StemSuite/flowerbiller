import Event from '../../../models/event.js';
import Sale from '../../../models/sale.js';

const EventQueries = {
	events: async () => {
		return Event.aggregate( [
			{ $project: {
				title: 1,
				customer: 1,
				store: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } },
				itemCount: 1
			}
			}]
		);
	},
    
	event: async ( _, { id }) => {
		return Event.findById( id,
			{
				title: 1,
				customer: 1,
				store: 1,
				items: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } },
			});
	},

	eventItems: async ( _, { eventID }) => {
		return Sale.find(
			{ eventID: { $eq: eventID } },
			{ 
				item: 1
			}
		);},

	eventsItems: async () => {
		return Sale.aggregate ( [
			{ $match: { eventID: { $exists: true } } },
			{ 
				$lookup:
					{
						from: 'purchases',
						let: { product: '$item.product', variety: '$item.variety', dateSold: '$dateSold', filledFrom: '$filledFrom' },
						pipeline: [
							{ $match: 
								{ $expr: 
									{ $and:
										[
											{ $lte: [ '$arrivalDate', { '$toDate': '$$dateSold' } ] },
											{ $gte: [ '$expirationDate', { '$toDate': '$$dateSold' } ] },
											{ $eq: [ '$item.product', '$$product' ] }, 
											{ $or: [ { $eq: [ '$item.variety', '$$variety' ] }, { $eq: [ '$item.variety', 'Ast' ] } ] },
										]
									}
								}
							},
							{ $project: { _id: 0, id: '$_id', item: 1, vendor: 1, arrivalDate: { $dateToString: { format: '%m/%d/%Y', date: '$arrivalDate' } } } }
						],
						as: 'fillOptions'
					}
			},
			{ $project: {
				item: 1,
				filledFrom: 1,
				fillOptions: 1, 
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$dateSold' } }
			} },
			{ $sort: { 'soldDate': 1, 'item.product': 1, 'item.variety': 1 } }
		] );
	}

};

export default EventQueries;
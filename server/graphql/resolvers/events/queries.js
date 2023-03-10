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
		return Sale.find({ eventID: { $exists: true } },
			{
				item: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$dateSold' } },
			})
			.sort({ product: 1, variety: 1 });
	}

};

export default EventQueries;
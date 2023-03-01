import Event from '../../../models/event.js';

const EventQueries = {
	events: async () => {
		return Event.find(
			{},
			{
				title: 1,
				customer: 1,
				store: 1,
				itemCount: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } },
			}
		);
	},
    
	event: async ( _, { id }) => {
		return Event.findById( id,
			{
				title: 1,
				customer: 1,
				store: 1,
				itemCount: 1,
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$date' } },
			});
	},

};

export default EventQueries;
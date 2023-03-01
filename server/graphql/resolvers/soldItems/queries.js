import SoldItem from '../../../models/soldItem.js';



const soldItemQueries = {
	eventItems: async ( _, { eventID }) => {
		return SoldItem.find({ eventID: { $eq: eventID } });
	},

	eventsItems: async () => {
		return SoldItem.find({ eventID: { $exists: true } },
			{
				product: { $concat: [ '$product', ' ', '$variety', ' ', '$size' ] },
				variety: 1,
				uom: { $concat: [ { $toString: '$quantity' }, ' ', '$uom' ] },
				fdate: { $dateToString: { format: '%m/%d/%Y', date: '$dateSold' } },
			})
			.sort({ dateSold: -1, product: 1, variety: 1 });
	}
};

export default soldItemQueries;
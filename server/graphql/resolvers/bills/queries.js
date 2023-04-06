import Bill from '../../../models/bill.js';

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
	}

};

export default billQueries;
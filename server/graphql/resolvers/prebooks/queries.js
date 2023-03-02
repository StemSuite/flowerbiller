import PreBook from '../../../models/prebook.js';
import Purchase from '../../../models/purchase.js';

const preBookQueries = {
	preBooks: async () => {
		return PreBook.find(
			{},
			{
				vendor: 1,
				shippingMethod: 1,
				itemCount: 1,
				venSH: '$vendor.shortHand',
				shipSH: '$shippingMethod.shortHand',
				fshippingDate: { $dateToString: { format: '%m/%d/%Y', date: '$shippingDate' } },
			}
		);
	},

	preBook: async ( _, { id }) => {
		return PreBook.findById( id,
			{
				venSH: '$vendor.shortHand',
				shipSH: '$shippingMethod.shortHand',
				fshippingDate: { $dateToString: { format: '%m/%d/%Y', date: '$shippingDate' } },
			});
	},

	preBookItems: async ( _, { preBookId }) => {
		return Purchase.find({ preBook: { $eq: preBookId } });
	}
};

export default preBookQueries;
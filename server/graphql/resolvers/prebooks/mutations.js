
import PreBook from '../../../models/prebook.js';
import moment from 'moment';
import shipmentMutations from '../shipments/mutations.js';
import purchaseMutations from '../purchases/mutations.js';

const preBookMutations = {
	addPreBook: async ( _, { preBook }) => {
		preBook.itemCount = 0;
		preBook.shippingDate =  moment.utc( new Date( preBook.shippingDate ) ).format( 'YYYY-MM-DD' );
		preBook.arrivalDate = moment.utc( new Date( preBook.shippingDate ) ).add( preBook.daysToArrive, 'days' ).format( 'YYYY-MM-DD' );

		let newPreBook = new PreBook( preBook );
		return newPreBook.save();
	},

	addPreBookItem: async( _, { preBookId, item }) => {
		item.totalQty = item.boxCount * item.qtyPerBox;
		item.totalPrice = item.totalQty * item.pricePerUnit;

		return PreBook.findByIdAndUpdate( preBookId, { $inc: { itemCount: item.boxCount } })
			.then( preBook => {

				let shipment = {  
					shipSH: preBook.shippingMethod.shortHand, 
					shippingDate: moment.utc( preBook.shippingDate ).format( 'YYYY-MM-DD' ),
					arrivalDate: moment.utc( preBook.arrivalDate ).format( 'YYYY-MM-DD' ),
				};

				return shipmentMutations.incShipmentItemCount( shipment, item.boxCount )
					.then( shipment => {

						item.preBook = preBook._id;
						item.shipment = shipment._id;
						item.shippingDate = moment.utc( shipment.shippingDate ).format( 'YYYY-MM-DD' ),
						item.arrivalDate = moment.utc( shipment.arrivalDate ).format( 'YYYY-MM-DD' );
						item.expirationDate = moment( shipment.arrivalDate ).add( item.daysToExp, 'days' ).format( 'YYYY-MM-DD' );
						return purchaseMutations.addSOPurchase( item );
					});
			});
	}
};

export default preBookMutations;
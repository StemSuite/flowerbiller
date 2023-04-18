
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
		let box = item.box;
		delete item.box;

		box.FBE = item.boxCount * box.FBE;
		box.CBF = item.boxCount * box.CBF;

		item.totalQty = ( item.boxCount * item.qtyPerBox ).toFixed( 2 );
		item.totalPrice = item.totalQty * item.pricePerUnit;
		item.boxType = box.type;


		return PreBook.findByIdAndUpdate( preBookId, { $inc: { itemCount: item.boxCount } })
			.then( preBook => {

				let shipment = {  
					shipSH: preBook.shippingMethod.shortHand, 
					shippingDate: moment.utc( preBook.shippingDate ).format( 'YYYY-MM-DD' ),
					arrivalDate: moment.utc( preBook.arrivalDate ).format( 'YYYY-MM-DD' ),
				};

				return shipmentMutations.incShipmentItems( shipment, item.boxCount, box.CBF, box.FBE )
					.then( shipment => {
						item.totalQty = item.boxCount * item.qtyPerBox;
						item.totalPrice = item.totalQty * item.pricePerUnit;

						let newPurchase = {
							preBook: preBook._id, 
							shipment: shipment._id,
							vendor: preBook.vendor.shortHand,
							shippingDate: moment.utc( shipment.shippingDate ).format( 'YYYY-MM-DD' ),
							arrivalDate: moment.utc( shipment.arrivalDate ).format( 'YYYY-MM-DD' ),
							expirationDate: moment( shipment.arrivalDate ).add( item.daysToExp, 'days' ).format( 'YYYY-MM-DD' ),
							box: box,
							item: item
						};
						
						purchaseMutations.addPurchase( newPurchase )
							.then( () => purchaseMutations.updateLandedPrices( _, { 
								shipmentID: shipment._id, 
								shipmentCBF: shipment.CBF,
								shipmentSurcharges: ( shipment.fuelPrice + shipment.cbfPrice ),
								shipmentBoxCharge: shipment.boxCharge
							}) );
							
						return preBook;
					});
			});
	}
};

export default preBookMutations;
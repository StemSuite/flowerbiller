import StandingOrder from '../../../models/standing_order.js';
import purchaseMutations from '../purchases/mutations.js';
import shipmentMutations from '../shipments/mutations.js';
import moment from 'moment';

const standingOrderMutations = {
	addStandingOrder: async ( _, { standingOrder }) => {
		let newStandingOrder = new StandingOrder( standingOrder );
		return newStandingOrder.save();
	},

	addSOItem: async( _, { standingOrderId, item }) => {
		
		item.totalQty = item.boxCount * item.qtyPerBox;
		item.totalPrice = item.totalQty * item.pricePerUnit;

		return StandingOrder.findByIdAndUpdate( standingOrderId, 
			{ $push: { items: item } }, 
			{ new: true }
		)
			.then( standingOrder => {
				let startDate = moment.utc( standingOrder.startDate );
				let endDate = moment.utc( standingOrder.endDate ) || null;
				
				let newPurchase = { standingOrder: standingOrder._id, vendor: standingOrder.venSH };
				newPurchase.item = standingOrder.items.slice( -1 )[0].toObject();

				let weeksOut = 0;

				while ( startDate.day() !== standingOrder.shippingDay ) {
					startDate.add( 1, 'day' );}
				let shippingDate = startDate;
       
				while ( shippingDate <= endDate && weeksOut <= 15 ) {
					let arrivalDate = moment( shippingDate ).add( standingOrder.daysToArrive, 'days' ).format( 'YYYY-MM-DD' );
					let shipment = {  
						shipSH: standingOrder.shipSH, 
						shippingDate: shippingDate.format( 'YYYY-MM-DD' ),
						arrivalDate: arrivalDate
					};
 
					shipmentMutations.incShipmentItemCount( shipment, item.boxCount )
						.then( shipment => {
							if ( !newPurchase.standingOrderItem ) {

								Object.defineProperty( newPurchase, 'standingOrderItem',
									Object.getOwnPropertyDescriptor( newPurchase.item, '_id' ) );
								delete newPurchase.item['_id'];
							}

							newPurchase.shipment = shipment._id;
							newPurchase.shippingDate = shippingDate.format( 'YYYY-MM-DD' ),
							newPurchase.arrivalDate = arrivalDate;
							newPurchase.expirationDate = moment( shipment.arrivalDate ).add( item.daysToExp, 'days' ).format( 'YYYY-MM-DD' );
       
							purchaseMutations.addSOPurchase( newPurchase );
						});
					weeksOut += 1;
					shippingDate.add( 7, 'days' );
				}
				return standingOrder;
			});

	},

	deleteSOItem: async( _, { standingOrderId, itemId }) => {
		return StandingOrder.findByIdAndUpdate( standingOrderId, 
			{ $pull: { items: { _id: itemId } } },
			{ new: true }
		);
	},
};

export default standingOrderMutations;
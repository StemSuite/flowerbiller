import StandingOrder from '../../../models/standing_order.js';
import purchaseMutations from '../purchases/mutations.js';
import shipmentMutations from '../shipments/mutations1.js';
import moment from 'moment';

const standingOrderMutations = {
	addStandingOrder: async ( _, { standingOrder }) => {
		let newStandingOrder = new StandingOrder( standingOrder );
		return newStandingOrder.save();
	},

	addSOItem: async( _, { standingOrderId, item }) => {
		let box = item.box;
		delete item.box;

		box.FBE = item.boxCount * box.FBE;
		box.CBF = item.boxCount * box.CBF;

		item.totalQty = item.boxCount * item.qtyPerBox;
		item.totalPrice = ( item.totalQty * item.pricePerUnit.toFixed( 2 ) );
		item.boxType = box.type;

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
 
					shipmentMutations.incShipmentItems( shipment, item.boxCount, box.CBF, box.FBE )
						.then( shipment => {
							if ( !newPurchase.standingOrderItem ) {

								Object.defineProperty( newPurchase, 'standingOrderItem',
									Object.getOwnPropertyDescriptor( newPurchase.item, '_id' ) );
								delete newPurchase.item['_id'];
							}

							newPurchase.shipment = shipment._id;
							newPurchase.shippingDate = moment.utc( shipment.shippingDate ).format( 'YYYY-MM-DD' ),
							newPurchase.arrivalDate = moment.utc( shipment.arrivalDate ).format( 'YYYY-MM-DD' ),
							newPurchase.expirationDate = moment( shipment.arrivalDate ).add( item.daysToExp, 'days' ).format( 'YYYY-MM-DD' );
							newPurchase.box = box;

							purchaseMutations.addPurchase( newPurchase )
								.then( () => purchaseMutations.updateLandedPrices( _, { 
									shipmentID: shipment._id, 
									shipmentCBF: shipment.CBF,
									shipmentSurcharges: ( shipment.fuelPrice + shipment.cbfPrice ),
									shipmentBoxCharge: shipment.boxCharge
								}) );
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
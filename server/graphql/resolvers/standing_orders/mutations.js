import Purchase from '../../../models/purchase.js';
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
				let endDate = standingOrder.endDate  || moment( standingOrder.startDate ).add( 15, 'weeks' );
				endDate = moment.utc( endDate );
		
				
				let newPurchase = { standingOrder: standingOrder._id, vendor: standingOrder.venSH };
				newPurchase.item = standingOrder.items.slice( -1 )[0].toObject();

				while ( startDate.day() !== standingOrder.shippingDay ) {
					startDate.add( 1, 'day' );}
				let shippingDate = startDate;
       
				while ( shippingDate <= endDate  ) {
					let arrivalDate = moment( shippingDate ).add( standingOrder.daysToArrive, 'days' ).format( 'YYYY-MM-DD' );
					let shipment = {  
						shipSH: standingOrder.shipSH, 
						shippingDate: shippingDate.format( 'YYYY-MM-DD' ),
						arrivalDate: arrivalDate
					};
 
					shipmentMutations.incShipmentItems( _,  {
						shipment: shipment, 
						boxCount: item.boxCount, 
						cbf: box.CBF, 
						fbe: box.FBE
					})
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
									shipmentSurcharges: ( shipment.totalSurcharge ),
									shipmentBoxCharge: shipment.boxCharge
								}) );
						});
					shippingDate.add( 7, 'days' );
				}
				return standingOrder;
			});

	},

	deleteSOItem: async( _, { standingOrderId, itemId }) => {
		Purchase.deleteMany(
			{
				standingOrder: standingOrderId,
				standingOrderItem: itemId
			}
		);

		return StandingOrder.findByIdAndUpdate( standingOrderId, 
			{ $pull: { items: { _id: itemId } } },
			{ new: true }
		);

	},
};

export default standingOrderMutations;
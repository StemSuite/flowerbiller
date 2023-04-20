
import Shipment from '../../../models/shipment.js';
import ShippingMethod from '../../../models/shipping_method.js';
import purchaseMutations from '../purchases/mutations.js';

const shipmentMutations = {
	incShipmentItems: async ( _, { shipment, boxCount, cbf, fbe }) => {
		return Shipment.findOneAndUpdate (
			{   shipSH: shipment.shipSH, 
				shippingDate: shipment.shippingDate,
			},
			[
				{ $set: {
					itemCount:{ $add: [ boxCount, '$itemCount' ] },
					FBE: { $add: [ fbe, '$FBE' ] },
					CBF: { $add: [ cbf, '$CBF' ] },
					cbfPrice: { $add: [ '$cbfPrice', { $multiply: [ cbf, '$pricePerCBF' ] } ] },
					fuelPrice: { $add: [ '$fuelPrice' ,{ $multiply: [ '$pricePerCBF', cbf, '$fuelCharge' ] } ] },
					totalSurcharge:  { 
						$add: [ 
							'$totalSurcharge', 
							{ $multiply: [ cbf, '$pricePerCBF' ] },
							{ $multiply: [ '$pricePerCBF', cbf, '$fuelCharge' ] }
						]
					}
				} }
			],
			{ returnDocument: 'after' }
		).then( res => {
			if ( res !== null ) return res;
			return ShippingMethod.findOne({ shortHand: { $eq: shipment.shipSH } })
				.then( res => {
					let newShipment = {
						shipSH: res.shortHand,
						shippingDate: shipment.shippingDate,
						arrivalDate:  shipment.arrivalDate,
						itemCount: boxCount,
						FBE: fbe,
						CBF: cbf,
						boxCharge: res.boxCharge,
						pricePerCBF: res.pricePerCBF,
						fuelCharge: res.fuelCharge,
						cbfPrice: ( res.pricePerCBF * cbf ),
						fuelPrice: ( res.pricePerCBF * cbf * res.fuelCharge ),
						totalSurcharge: ( res.pricePerCBF * cbf ) + ( res.pricePerCBF * cbf * res.fuelCharge )
					};
					return new Shipment ( newShipment ).save();
				});
		});
	},

	updateShipmentSurcharge: async ( _, { id, totalSurcharge }) => {
		return Shipment.findByIdAndUpdate( id, 
			{
				totalSurcharge: totalSurcharge
			},
			{ returnDocument: 'after' }
		)
			.then( shipment => {
				purchaseMutations.updateLandedPrices( _, { 
					shipmentID: shipment._id, 
					shipmentCBF: shipment.CBF,
					shipmentSurcharges: ( shipment.totalSurcharge ),
					shipmentBoxCharge: shipment.boxCharge
				});
				return shipment;
			});
	},


};

export default shipmentMutations;
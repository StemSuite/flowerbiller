
import Shipment from '../../../models/shipment.js';
import ShippingMethod from '../../../models/shipping_method.js';

const shipmentMutations = {
	incShipmentItems: async ( shipment, boxCount, cbf, fbe ) => {
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
						fuelPrice: ( res.pricePerCBF * cbf * res.fuelCharge )
					};
					return new Shipment ( newShipment ).save();
				});
		});
	}
};

export default shipmentMutations;
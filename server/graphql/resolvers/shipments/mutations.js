
import Shipment from '../../../models/shipment.js';

const shipmentMutations = {
	incShipmentItemCount: async ( shipment, itemCount ) => {
		return Shipment.findOneAndUpdate (
			{   shipSH: shipment.shipSH, 
				shippingDate: shipment.shippingDate,
				arrivalDate: shipment.arrivalDate
			},
			{ $inc: { itemCount: itemCount } },
			{ upsert: true, new: true },
		);},
};

export default shipmentMutations;
import Shipment from  '../../../models/shipment.js';
import Purchase from  '../../../models/purchase.js';



const shipmentQueries = {

	shipments: async () => {
		return Shipment.find(
			{},
			{
				shipSH: 1,
				itemCount: 1,
				fshippingDate: { $dateToString: { format: '%m/%d/%Y', date: '$shippingDate' } },
				farrivalDate: { $dateToString: { format: '%m/%d/%Y', date: '$arrivalDate' } }
			}
		);
	},

	shipment: async ( _, { id }) => {
		return Shipment.findById( id, 
			{
				shipSH: 1,
				itemCount: 1,
				fshippingDate: { $dateToString: { format: '%m/%d/%Y', date: '$shippingDate' } },
				farrivalDate: { $dateToString: { format: '%m/%d/%Y', date: '$arrivalDate' } }          
			});
	},

	shipmentItems: async ( _, { shipmentID }) => {
		return Purchase.find({ shipment: { $eq: shipmentID } });
	},
};

export default shipmentQueries;
import ItemsList from './components/ItemsList';

function ShipmentsTable ({ shipments }) {

	let fields = [
		{ 
			header: 'Shipping Date', 
			sort: 'fshippingDate',
			format: ( shipment ) => shipment.fshippingDate
		},
		{ 
			header: 'Arrival Date', 
			sort: 'farrivalDate',
			format: ( shipment ) => shipment.farrivalDate
		},
		{ 
			header: 'Shipping via', 
			sort: 'shipSH',
			format: ( shipment ) => shipment.shipSH
		},
		{ 
			header: 'Box Count', 
			key: 'itemCount',
			format: ( shipment ) => shipment.itemCount
		}
	];


	return (
		<ItemsList
			items={shipments}
			fields={fields}
			path={'shipment'}
		/>
	); 
}

export default ShipmentsTable;
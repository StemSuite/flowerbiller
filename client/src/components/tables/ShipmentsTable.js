import ItemsList from './components/ItemsList';

function ShipmentsTable ({ shipments }) {

	let fields = [
		{ 
			header: 'Shipping Date', 
			sort: 'fshippingDate',
			format: ( shipment ) => shipment.fshippingDate
		},
		{ 
			header: 'Shipping Date', 
			sort: 'fshippingDate',
			format: ( shipment ) => shipment.fshippingDate
		},
		{ 
			header: 'Shipping Method', 
			sort: 'shipSH',
			format: ( shipment ) => shipment.shipSH
		},
		{ 
			header: '# of Items', 
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
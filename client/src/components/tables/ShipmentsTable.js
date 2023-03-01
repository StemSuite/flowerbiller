import OrdersTable from './OrdersTable';

function ShipmentsTable ({ shipments }) {

	let fields = [
		{ header: 'Shipping Date', key: 'fshippingDate', sort: true },
		{ header: 'Arrival Date', key: 'farrivalDate', sort: true },
		{ header: 'Shipping Method', key: 'shipSH', sort: true },
		{ header: '# of Items', key: 'itemCount' }
	];


	return (
		<OrdersTable
			orders={shipments}
			fields={fields}
			path={'shipment'}
		/>
	); 
}

export default ShipmentsTable;
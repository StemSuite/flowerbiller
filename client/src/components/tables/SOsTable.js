import ItemsList from './components/ItemsList.js';
import { dayOfWeek } from './ItemFormats.js';

function SOsTable({ standingOrders }) {
	const fields = [
		{ 
			header: 'Vendor', 
			sort: 'venSH',
			format: ( order ) => order.venSH
		},
		{ 
			header: 'Shipping via', 
			sort: 'shipSH',
			format: ( order ) => order.shipSH
		},
		{ 
			header: 'Start Date', 
			sort: 'fstartDate',
			format: ( order ) => order.fstartDate
		},
		{ 
			header: 'End Date', 
			sort: 'fendDate',
			format: ( order ) => order.fendDate
		},
		{ 
			header: 'Shipping Day', 
			format: ( order ) => dayOfWeek( order.shippingDay )
		},
		{ 
			header: 'Item Count', 
			format: ( order ) => order.itemCount
		},
	];

	return (
		<ItemsList
			items={standingOrders}
			fields={fields}
			path={'standing_order'}
		/>
	); 
}

export default SOsTable;
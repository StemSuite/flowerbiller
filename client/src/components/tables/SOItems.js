import ItemsList from './ItemsList.js';
import { DELETE_SO_ITEM } from '../../lib/Mutations.js';
import { useMutation } from 'urql';

function SOItems({ items, orderID }) {

	const [ , deleteSOItem ] = useMutation( DELETE_SO_ITEM );

	const fields = [ 
		{ header: 'Product', key: 'product', sort: true },
		{ header: 'Variety', key: 'variety' },
		{ header: 'Size', key: 'size' },
		{ header: 'Boxes', key: 'boxCount' },
		{ header: 'Box Type', key: 'boxType' },
		{ header: 'Qty/Box', key: 'qtyPerBox' },
		{ header: 'UoM', key: 'uom' },
		{ header: '$/Unit', key: 'pricePerUnit' },
		{ header: 'Total Qty', key: 'totalQty', sort: true },
		{ header: 'Total $', key: 'totalPrice' },
	];

	function handleDeleteItem( itemID ) {
		deleteSOItem({ standingOrderId: orderID, itemId: itemID });
	}

	return (
		<ItemsList
			items={items}
			fields={fields}
			handleDeleteItem={handleDeleteItem}
		/>
	);
}

export default SOItems;

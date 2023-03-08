import { DELETE_SO_ITEM } from '../../lib/Mutations.js';
import { useMutation } from 'urql';
import ItemsList from './components/ItemsList';
import { boxes, fullProduct, price, qtyUom } from './ItemFormats.js';

const fields = [ 
	{ 
		header: 'Product', 
		sort: 'product', 
		format: ( item ) => fullProduct( item )
	},
	{ 
		header: 'Boxes', 
		format: ( item ) => boxes( item )
	},
	{ 
		header: 'Qty/Box',
		format: ( item ) => qtyUom( item.qtyPerBox, item.uom )
	},
	{ 
		header: '$/Unit', 
		format: ( item ) => price( item.pricePerUnit )
	},
	{ 
		header: 'Total Qty', 
		format: ( item ) => qtyUom( item.totalQty, item.uom ) 
	},
	{ 
		header: 'Total $', 
		format: ( item ) => price( item.totalPrice )
	},
];

function SOItems({ items, orderID }) {

	const [ , deleteSOItem ] = useMutation( DELETE_SO_ITEM );

	function handleDeleteItem( itemID ) {
		deleteSOItem({ standingOrderId: orderID, itemId: itemID });
	}

	return (
		<ItemsList items={items} fields={fields} handleDeleteItem={handleDeleteItem}/>
	);
}

export default SOItems;

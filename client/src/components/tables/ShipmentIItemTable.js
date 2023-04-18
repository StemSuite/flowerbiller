/* eslint-disable import/namespace */
import ItemsList from './components/ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import { SHIPMENT_ITEMS_QUERY } from '../../lib/Queries.js';
import { boxes, fullProduct, price, qtyUom } from './ItemFormats.js';


function ShipmentItemsTable({ shipmentID }) {
	const [ items, setItems ] = useState( [] );

	const [fetchedItems] = useQuery({
		query: SHIPMENT_ITEMS_QUERY,
		variables: { shipmentID },
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.shipmentItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ 
			header: 'Vendor', 
			sort: 'vendor', 
			format: ( purchase ) => purchase.vendor
		},
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( purchase ) => fullProduct( purchase.item )
		},
		{ 
			header: 'Boxes', 
			format: ( purchase ) => boxes( purchase.item )
		},
		{ 
			header: 'Qty/Box',
			format: ( purchase ) => qtyUom( purchase.item.qtyPerBox, purchase.item.uom )
		},
		{ 
			header: '$/Unit', 
			format: ( purchase ) => price( purchase.item.pricePerUnit )
		},
		{ 
			header: 'Total Qty', 
			format: ( purchase ) => qtyUom( purchase.item.totalQty, purchase.item.uom ) 
		},
		{ 
			header: 'Product $', 
			format: ( purchase ) => price( purchase.item.totalPrice )
		},
		{ 
			header: 'Shipping $', 
			format: ( purchase ) => price( purchase.landedPrice - purchase.item.totalPrice )
		},
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default ShipmentItemsTable;
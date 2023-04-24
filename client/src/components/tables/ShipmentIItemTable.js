/* eslint-disable import/namespace */
import ItemsList from './components/ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import { SHIPMENT_ITEMS_QUERY } from '../../lib/Queries.js';
import { boxes, fullProduct, price, qtyUom } from './ItemFormats.js';

function getVendorBoxCount( lineItem ) {
	let boxCounts = { 'All': { boxCount: 0 } };

	lineItem.forEach( lineItem => {	
		boxCounts['All'].boxCount += lineItem.item.boxCount;
		if ( boxCounts[lineItem.vendor] ) {
			boxCounts[lineItem.vendor].boxCount += lineItem.item.boxCount ;
		} else {
			boxCounts[lineItem.vendor] = { boxCount: lineItem.item.boxCount };
		}
	});

	return boxCounts;
}


function ShipmentItemsTable({ shipmentID, setVendorBoxCount, refetchTable }) {
	const [ items, setItems ] = useState( [] );

	const [ fetchedItems, reexecuteQuery ] = useQuery({
		query: SHIPMENT_ITEMS_QUERY,
		variables: { shipmentID },
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.shipmentItems );
		setVendorBoxCount( getVendorBoxCount( data.shipmentItems ) );
	}, [data] );

	useEffect( () => {
		reexecuteQuery({ requestPolicy: 'network-only' });
	},[refetchTable] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;
	console.log( items );

	const fields = [ 
		{ 
			header: 'Vendor', 
			sort: 'vendor', 
			format: ( purchase ) => purchase.vendor
		},
		{ 
			header: 'SO?', 
			format: ( purchase ) => {if ( purchase.standingOrder ) return '*';}
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
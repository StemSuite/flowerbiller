/* eslint-disable no-unused-vars */
import ItemsList from './components/ItemsList.js';
import { DELETE_EVENT_ITEM } from '../../lib/Mutations.js';
import { useMutation, useQuery } from 'urql';
import { fullProduct, qtyUom } from './ItemFormats.js';
import { useEffect, useMemo, useState } from 'react';
import { EVENT_ITEMS_QUERY } from '../../lib/Queries.js';

const fields = [ 
	{ 
		header: 'Product', 
		sort: 'product', 
		format: ( sale ) => fullProduct( sale.item )
	},
	{ 
		header: 'Qty', 
		format: ( sale ) => qtyUom( sale.item.quantity, sale.item.uom ) 
	},
];

function EventItems({ eventID }) {

	const [ items, setItems ] = useState( [] );

	const [ , deleteEventItem ] = useMutation( DELETE_EVENT_ITEM );

	function handleDeleteItem( itemID ) {
		deleteEventItem({ eventID: eventID, itemID: itemID });
	}

	const context = useMemo( () => ({ additionalTypenames: ['Sale'] }), [] );

	const [fetchedItems] = useQuery({
		query: EVENT_ITEMS_QUERY,
		variables: { eventID },
		context: context
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		console.log( data );
		setItems( data.eventItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;


	return (
		<ItemsList
			items={items}
			fields={fields}
			handleDeleteItem={handleDeleteItem}
		/>
	);
}

export default EventItems;
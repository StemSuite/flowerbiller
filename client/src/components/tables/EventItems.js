import ItemsList from './ItemsList.js';
import { DELETE_EVENT_ITEM } from '../../lib/Mutations.js';
import { useMutation, useQuery } from 'urql';
import { useEffect, useMemo, useState } from 'react';
import { EVENT_ITEMS_QUERY } from '../../lib/Queries.js';

function EventItems({ eventID }) {

	const [ items, setItems ] = useState( [] );

	const [ , deleteEventItem ] = useMutation( DELETE_EVENT_ITEM );

	const context = useMemo( () => ({ additionalTypenames: ['SoldItem'] }), [] );

	const [fetchedItems] = useQuery({
		query: EVENT_ITEMS_QUERY,
		variables: { eventID },
		context: context
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.eventItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ header: 'Product', key: 'product', sort: true },
		{ header: 'Variety', key: 'variety' },
		{ header: 'Size', key: 'size' },
		{ header: 'UoM', key: 'uom' },
		{ header: 'QTY', key: 'quantity' },
	];

	function handleDeleteItem( itemID ) {
		deleteEventItem({ eventID: eventID, itemID: itemID });
	}

	return (
		<ItemsList
			items={items}
			fields={fields}
			handleDeleteItem={handleDeleteItem}
		/>
	);
}

export default EventItems;
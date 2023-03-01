import ItemsList from './ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import { EVENTS_ITEMS_QUERY } from '../../lib/Queries.js';

function EventsItemsTable() {

	const [ items, setItems ] = useState( [] );

	const [fetchedItems] = useQuery({
		query: EVENTS_ITEMS_QUERY,
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.eventsItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ header: 'Product', key: 'product', sort: true },
		{ header: 'UoM', key: 'uom' },
		{ header: 'Event Date', key: 'fdate' },
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default EventsItemsTable;
import ItemsList from './components/ItemsList.js';
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
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( item ) => item.product
		},
		{ 
			header: 'Qty', 
			format: ( item ) => item.uom
		},
		{ 
			header: 'Event Date', 
			format: ( item ) => item.fdate
		},
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default EventsItemsTable;
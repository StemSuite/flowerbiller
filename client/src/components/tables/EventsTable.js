import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { EVENTS_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

function EventsTable() {
	const [ events, setEvents ] = useState( [] );

	const context = useMemo( () => ({ additionalTypenames: ['Event'] }), [] );
	
	const [fetchedEvents] = useQuery({
		query: EVENTS_QUERY,
		context: context
	});
    
	const { data, fetching, error } = fetchedEvents;
      
	useEffect( () => {
		if ( data === undefined ) return;
		setEvents( data.events );
	}, [data] );
    
	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [
		{ 
			header: 'Customer', 
			sort: 'customer',
			format: ( event ) => event.customer
		},
		{ 
			header: 'Title', 
			format: ( event ) => event.title
		},
		{ 
			header: 'Customer', 
			format: ( event ) => event.fdate
		},
		{ 
			header: 'Store', 
			format: ( event ) => event.store
		},
		{ 
			header: 'Item Count', 
			format: ( event ) => event.itemCount
		},
	];

	return (
		<ItemsList
			items={events}
			fields={fields}
			path={'event'}
		/>
	); 
}

export default EventsTable;
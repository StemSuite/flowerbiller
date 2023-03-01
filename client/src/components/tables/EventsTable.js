import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { EVENTS_QUERY } from '../../lib/Queries.js';
import OrdersTable from './OrdersTable.js';

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
		{ header: 'Customer', key: 'customer', sort: true },
		{ header: 'Title', key: 'title' },
		{ header: 'Date', key: 'fdate' },
		{ header: 'Store', key: 'store' },
		{ header: '# of Items', key: 'itemCount' }
	];

	return (
		<OrdersTable
			orders={events}
			fields={fields}
			path={'event'}
		/>
	); 
}

export default EventsTable;
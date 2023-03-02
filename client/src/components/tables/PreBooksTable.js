import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { PREBOOKS_QUERY } from '../../lib/Queries.js';
import OrdersTable from './OrdersTable.js';


function PreBooksTable() {

	const [ preBooks, setPreBooks ] = useState( [] );

	const context = useMemo( () => ({ additionalTypenames: ['PreBook'] }), [] );
  
	const [fetchedPreBooks] = useQuery({
		query: PREBOOKS_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedPreBooks;

	useEffect( () => {
		if ( data === undefined ) return;
		setPreBooks( data.preBooks );
	}, [data] );


	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [
		{ header: 'Shipping Date', key: 'fshippingDate', sort: true },
		{ header: 'Vendor', key: 'venSH', sort: true },
		{ header: 'Shipping Method', key: 'shipSH' },
		{ header: '# of Items', key: 'itemCount' }
	];

	return (
		<OrdersTable
			orders={preBooks}
			fields={fields}
			path={'prebook'}
		/>
	); 

}

export default PreBooksTable;
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { BILLS_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

function BillsTable() {
	const [ bills, setBills ] = useState( [] );

	const context = useMemo ( () => ({ additionalTypenames: ['Bill'] }), [] );

	const [fetchedBills] = useQuery({
		query: BILLS_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedBills;

	useEffect( () => {
		if ( data === undefined ) return;
		setBills( data.bills );
	}, [data] );
    
	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [
		{ 
			header: 'Date',
			sort: 'fdate',
			format: ( bill ) => bill.fdate
		},
		{ 
			header: 'Store', 
			format: ( bill ) => bill.store
		},
	];

	return (
		<ItemsList
			items={bills}
			fields={fields}
			path={'bill'}
		/>
	);
}

export default BillsTable;
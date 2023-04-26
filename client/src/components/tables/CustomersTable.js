import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { STORES_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

function StoresTable() {
	const [ stores, setStores ] = useState( [] );

	const context = useMemo ( () => ({ additionalTypenames: ['Store'] }), [] );

	const [fetchedStores] = useQuery({
		query: STORES_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedStores;

	useEffect( () => {
		if ( data === undefined ) return;
		setStores( data.stores );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [
		{
			header: 'Name',
			sort: 'name',
			format: ( store ) => store.name 
		},
		{ 
			header: 'Address', 
			format: ( store ) => store.address
		},
	];

	return (
		<ItemsList
			items={stores}
			fields={fields}
		/>
	);
}

export default StoresTable;
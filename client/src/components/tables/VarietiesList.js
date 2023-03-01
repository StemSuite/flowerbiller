import { useEffect } from 'react';
import { useQuery } from 'urql';
import { VARIETIES_QUERY } from '../../lib/Queries';
import ItemsList from './ItemsList';

function VarietiesList({ varieties, setVarieties }) {

	const [fetchedVarieties] = useQuery({
		query: VARIETIES_QUERY
	});

	const { data, fetching, error } = fetchedVarieties;

	useEffect( () => {
		if ( data === undefined ) return;
		setVarieties( data.varieties );
	}, [ data, setVarieties ] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ header: 'Product', key: 'product', sort: true },
		{ header: 'Variety', key: 'variety' },
		{ header: 'Colors', key: 'colors' },
		{ header: 'Tags', key: 'tags' },
	];

	return (
		<ItemsList
			items={varieties}
			fields={fields}
		/>
	);
}

export default VarietiesList;
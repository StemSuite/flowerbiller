import { useEffect } from 'react';
import { useQuery } from 'urql';
import { VARIETIES_QUERY } from '../../lib/Queries';
import { arrayItems } from './ItemFormats';
import ItemsList from './components/ItemsList';

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
		{ 
			header: 'Product',
			sort: 'product',
			format: ( product ) => product.product
		},
		{ 
			header: 'Variety', 
			format: ( product ) => product.variety
		},
		{ 
			header: 'Colors', 
			format: ( product ) => arrayItems( product.colors )
		},
		{ 
			header: 'Tags', 
			format: ( product ) => arrayItems( product.tags )
		},
	];

	return (
		<ItemsList
			items={varieties}
			fields={fields}
		/>
	);
}

export default VarietiesList;
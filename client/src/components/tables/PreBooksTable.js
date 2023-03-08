import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { PREBOOKS_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

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
		{ 
			header: 'Shipping Date', 
			sort: 'fshippingDate',
			format: ( order ) => order.fshippingDate
		},
		{ 
			header: 'Vendor', 
			sort: 'venSH',
			format: ( order ) => order.venSH
		},
		{ 
			header: 'Shipping Method', 
			format: ( order ) => order.shipSH
		},
		{ 
			header: '# of Items', 
			format: ( order ) => order.itemCount
		}
	];

	return (
		<ItemsList
			items={preBooks}
			fields={fields}
			path={'prebook'}
		/>
	); 

}

export default PreBooksTable;
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { BOXES_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

function BoxesTable() {
	const [ boxes, setBoxes ] = useState( [] );

	const context = useMemo ( () => ({ additionalTypenames: ['Box'] }), [] );

	const [fetchedBoxes] = useQuery({
		query: BOXES_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedBoxes;

	useEffect( () => {
		if ( data === undefined ) return;
		setBoxes( data.boxes );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [
		{ 
			header: 'Type',
			sort: 'type',
			format: ( box ) => box.type
		},
		{ 
			header: '% of FB', 
			format: ( box ) => box.perOfFB
		},
		{ 
			header: 'Default CBF', 
			format: ( box ) => box.CBF
		},
	];

	return (
		<ItemsList
			items={boxes}
			fields={fields}
		/>
	);

}

export default BoxesTable;
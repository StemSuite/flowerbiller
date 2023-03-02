import ItemsList from './ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useMemo, useState } from 'react';
import { PREBOOK_ITEMS_QUERY } from '../../lib/Queries.js';

function PreBookItemsTable({ preBookId }) {
	const [ items, setItems ] = useState( [] );

	const context = useMemo( () => ({ additionalTypenames: ['Purchase'] }), [] );

	const [fetchedItems] = useQuery({
		query: PREBOOK_ITEMS_QUERY,
		variables: { preBookId },
		context: context
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.preBookItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ header: 'Product', key: 'product', sort: true },
		{ header: 'Variety', key: 'variety' },
		{ header: 'Size', key: 'size' },
		{ header: 'Boxes', key: 'boxCount' },
		{ header: 'Box Type', key: 'boxType' },
		{ header: 'Qty/Box', key: 'qtyPerBox' },
		{ header: 'UoM', key: 'uom' },
		{ header: '$/Unit', key: 'pricePerUnit' },
		{ header: 'Total Qty', key: 'totalQty', sort: true },
		{ header: 'Total $', key: 'totalPrice' },
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default PreBookItemsTable;
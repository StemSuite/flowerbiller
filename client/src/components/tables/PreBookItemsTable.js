import ItemsList from './components/ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useMemo, useState } from 'react';
import { PREBOOK_ITEMS_QUERY } from '../../lib/Queries.js';
import { boxes, fullProduct, price, qtyUom } from './ItemFormats.js';

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
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( purchase ) => fullProduct( purchase.item )
		},
		{ 
			header: 'Boxes', 
			format: ( purchase ) => boxes( purchase.item )
		},
		{ 
			header: 'Qty/Box',
			format: ( purchase ) => qtyUom( purchase.item.qtyPerBox, purchase.item.uom )
		},
		{ 
			header: '$/Unit', 
			format: ( purchase ) => price( purchase.item.pricePerUnit )
		},
		{ 
			header: 'Total Qty', 
			format: ( purchase ) => qtyUom( purchase.item.totalQty, purchase.item.uom ) 
		},
		{ 
			header: 'Total $', 
			format: ( purchase ) => price( purchase.item.totalPrice )
		},
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default PreBookItemsTable;
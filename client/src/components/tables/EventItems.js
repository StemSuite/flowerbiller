import ItemsList from './components/ItemsList.js';
import { DELETE_EVENT_ITEM } from '../../lib/Mutations.js';
import { useMutation, useQuery } from 'urql';
import { useEffect, useMemo, useState } from 'react';
import { EVENT_ITEMS_QUERY } from '../../lib/Queries.js';
import { fullProduct, qtyUom } from './ItemFormats.js';

function EventItems({ eventID }) {

	const [ items, setItems ] = useState( [] );

	const [ , deleteEventItem ] = useMutation( DELETE_EVENT_ITEM );

	const context = useMemo( () => ({ additionalTypenames: ['SoldItem'] }), [] );

	const [fetchedItems] = useQuery({
		query: EVENT_ITEMS_QUERY,
		variables: { eventID },
		context: context
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.eventItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( item ) => fullProduct( item )
		},
		{ 
			header: 'Qty', 
			format: ( item ) => qtyUom( item.quantity, item.uom ) 
		},
	];

	function handleDeleteItem( itemID ) {
		deleteEventItem({ eventID: eventID, itemID: itemID });
	}

	return (
		<ItemsList
			items={items}
			fields={fields}
			handleDeleteItem={handleDeleteItem}
		/>
	);
}

export default EventItems;
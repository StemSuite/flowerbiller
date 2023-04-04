import ItemsList from './components/ItemsList.js';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import { EVENTS_ITEMS_QUERY } from '../../lib/Queries.js';
import { fullProduct, qtyUom } from './ItemFormats.js';
import PullFromField from '../forms/Fields/PullFromField.js';

function EventsItemsTable() {

	const [ items, setItems ] = useState( [] );

	const [fetchedItems] = useQuery({
		query: EVENTS_ITEMS_QUERY,
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.eventsItems );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ 
			header: 'Event Date',
			sort: 'fdate',
			format: ( sale ) => sale.fdate
		},
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( sale ) => fullProduct( sale.item )
		},
		{ 
			header: 'Qty', 
			format: ( sale ) => qtyUom( sale.item.quantity, sale.item.uom ) 
		},
		{ 
			header: 'Pulled From', 
			format: ( sale ) => <PullFromField item={sale}/>
		},
	];
	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
}

export default EventsItemsTable;
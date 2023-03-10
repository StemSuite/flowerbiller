import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { INVENTORY_QUERY } from '../../lib/Queries';
import ItemsList from './components/ItemsList';
import { fullProduct, qtyUom } from './ItemFormats';

const fields = [ 
	{ 
		header: 'Product', 
		sort: 'product', 
		format: ( item ) => fullProduct( item )
	},
	{ 
		header: 'Qty', 
		format: ( item ) => qtyUom( item.qtyAvailable, item.uom ) 
	},
];

function InventoryTable({ date }) {
	const [ inventory, setInventory ] = useState( [] );

	const [fetchedInventory] = useQuery({
		query: INVENTORY_QUERY,
		variables: { date }
	});

	const { data, fetching, error } = fetchedInventory;

	useEffect( () => {
		if ( data === undefined ) return;
		setInventory( data.inventory || [] );
	}, [ data, date ] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<ItemsList
			items={inventory}
			fields={fields}
		/>
	);

}

export default InventoryTable;
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { SHIPPING_METHODS_QUERY } from '../../lib/Queries.js';
import ItemsList from './components/ItemsList.js';

function ShippingMethodsTable() {
	const [ methods, setMethods ] = useState( [] );

	const context = useMemo ( () => ({ additionalTypenames: ['ShippingMethod'] }), [] );

	const [fetchedBoxes] = useQuery({
		query: SHIPPING_METHODS_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedBoxes;

	useEffect( () => {
		if ( data === undefined ) return;
		setMethods( data.shippingMethods );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	console.log( data );

	const fields = [
		{ 
			header: 'Name',
			sort: 'name',
			format: ( method ) => method.name
		},
		{ 
			header: 'Short Hand',
			format: ( method ) => method.shortHand
		},
		{ 
			header: 'Days to Arrive',
			format: ( method ) => method.daysToArrive
		},
		{ 
			header: '$/CBF',
			format: ( method ) => method.pricePerCBF
		},
		{ 
			header: '$/Box',
			format: ( method ) => method.boxCharge
		},
	];

	return (
		<ItemsList
			items={methods}
			fields={fields}
		/>
	);

}

export default ShippingMethodsTable;
import { useQuery } from 'urql';
import { STANDING_ORDERS_QUERY } from '../lib/Queries.js';
import { useEffect, useMemo, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';
import SOsTable from '../components/tables/SOsTable.js';
import AddSOForm from '../components/forms/AddSOForm.js';

function StandingOrders () {
	const [ standingOrders, setStandingOrders ] = useState( [] );

	const context = useMemo( () => ({ additionalTypenames: ['StandingOrder'] }), [] );
  
	const [fetchedStandingOrders] = useQuery({
		query: STANDING_ORDERS_QUERY,
		context: context
	});

	const { data, fetching, error } = fetchedStandingOrders;

	useEffect( () => {
		if ( data === undefined ) return;
		setStandingOrders( data.standingOrders );
	}, [data] );


	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Standing Orders</Heading>
			<Flex>
				<AddSOForm/>
			</Flex>
			<SOsTable standingOrders={standingOrders}/>
		</>
	);
}
  
export default StandingOrders;
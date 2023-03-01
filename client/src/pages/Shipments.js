import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import ShipmentsTable from '../components/tables/ShipmentsTable';
import { SHIPMENTS_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';

function Shipments () {
	const [ shipments, setShipments ] = useState( [] );

	const [fetchedShipments] = useQuery({
		query: SHIPMENTS_QUERY
	});

	const { data, fetching, error } = fetchedShipments;

	useEffect( () => {
		if ( data === undefined ) return;
		setShipments( data.shipments );
	}, [data] );


	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<div>
			<Heading sx={pageHeaderStyle}>Shipments</Heading>
			<Flex>

			</Flex>
			<ShipmentsTable shipments={shipments} />
		</div>
	);
}

export default Shipments;
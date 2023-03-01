import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import ShipmentItemsTable from '../components/tables/ShipmentIItemTable';
import { SHIPMENT_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';

function Shipment() {
	const id = useParams().id;

	const [ shipment, setShipment ] = useState( [] );

	const [fetchedShipment] = useQuery({
		query: SHIPMENT_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = fetchedShipment;

	useEffect( () => {
		if ( data === undefined ) return;
		setShipment( data.shipment );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Shipment</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" marginY="20px">
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping Method</Text>
					<Text>{shipment.shipSH}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping Date</Text>
					<Text>{shipment.fshippingDate}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Arrival Date</Text>
					<Text>{shipment.farrivalDate}</Text>
				</Box>
			</Flex>
			<ShipmentItemsTable shipmentID={id}/>
		</>
	);
}

export default Shipment;
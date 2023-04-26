import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { STANDING_ORDER_QUERY } from '../lib/Queries.js';
// import SOItemForm from '../components/forms/SOItemForm.js';
import SOItems from '../components/tables/SOItems';
import { useEffect, useState } from 'react';
import { daysOfTheWeek } from '../lib/data.js';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';
import { ADD_SO_ITEM } from '../lib/Mutations.js';
import IncomingItemForm from '../components/forms/AddIncomingItemForm.js';

function StandingOrder () {
	const id = useParams().id;

	const [ items, setItems ] = useState( [] );

	const [fetchedStandingOrder] = useQuery({
		query: STANDING_ORDER_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = fetchedStandingOrder;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.standingOrder.items );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	let standingOrder = data.standingOrder;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Standing Order</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px"> 
					<Text textDecor="underline" fontSize="lg">Vendor</Text>
					<Text>{standingOrder.venSH}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Dates</Text>
					<Text>{standingOrder.fstartDate} - {standingOrder.fendDate || 'N/A'}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping</Text>
					<Text>{daysOfTheWeek[standingOrder.shippingDay]}(s) via {standingOrder.shipSH}</Text>
				</Box>
			</Flex>
			<IncomingItemForm order={standingOrder} mutation={ADD_SO_ITEM} />
			<SOItems items={items} orderID={id}/>
		</>
	);
}

export default StandingOrder;

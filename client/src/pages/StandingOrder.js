import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { STANDING_ORDER_QUERY } from '../lib/Queries.js';
import SOItemForm from '../components/forms/SOItemForm.js';
import SOItems from '../components/tables/SOItems';
import { useEffect, useState } from 'react';
import { daysOfTheWeek } from '../lib/data.js';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';

function StandingOrder () {
	const id = useParams().id;

	const [ items, setItems ] = useState( [] );

	const [standingOrder] = useQuery({
		query: STANDING_ORDER_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = standingOrder;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.standingOrder.items );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	let info = data.standingOrder;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Standing Order</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px"> 
					<Text textDecor="underline" fontSize="lg">Vendor</Text>
					<Text>{info.venSH}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Dates</Text>
					<Text>{info.fstartDate} - {info.fendDate}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping</Text>
					<Text>{daysOfTheWeek[info.shippingDay]}(s) via {info.shipSH}</Text>
				</Box>
			</Flex>
			<SOItemForm standingOrder={info} />
			<SOItems items={items} orderID={id}/>
		</>
	);
}

export default StandingOrder;

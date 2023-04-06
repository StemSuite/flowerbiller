import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles';
import { BILL_QUERY } from '../lib/Queries';

function Bill() {
	const id = useParams().id;

	const [ bill, setBill ] = useState( [] );

	const [fetchedBill] = useQuery({
		query: BILL_QUERY,
		variables: { id }
	});

	const { data, fetching, error } = fetchedBill;

	useEffect( () => {
		if ( data === undefined ) return;
		setBill( data.bill );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Bill</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Date</Text>
					<Text>{bill.fdate}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Store</Text>
					<Text>{bill.store}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Mark Up</Text>
					<Text>{bill.markUpPercent}%</Text>
				</Box>
				<Spacer/>
			</Flex>
		</>
	);
}

export default Bill;
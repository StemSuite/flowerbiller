import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';
import { PREBOOK_QUERY } from '../lib/Queries.js';
import PreBookItemsTable from '../components/tables/PreBookItemsTable.js';
import IncomingItemForm from '../components/forms/AddIncomingItemForm.js';
import { ADD_PREBOOK_ITEM } from '../lib/Mutations.js';

function PreBook () {
	const id = useParams().id;

	const [ preBook, setPrebook ] = useState( [] );

	const [fetchedPreBook] = useQuery({
		query: PREBOOK_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = fetchedPreBook;

	useEffect( () => {
		if ( data === undefined ) return;
		setPrebook( data.preBook );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Pre-Booking</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px"> 
					<Text textDecor="underline" fontSize="lg">Vendor</Text>
					<Text>{preBook.venSH}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping</Text>
					<Text>{preBook.fshippingDate} via {preBook.shipSH}</Text>
				</Box>
			</Flex>
			<IncomingItemForm order={preBook} mutation={ADD_PREBOOK_ITEM} />
			<PreBookItemsTable preBookId={id}/>
		</>
	);
}

export default PreBook;

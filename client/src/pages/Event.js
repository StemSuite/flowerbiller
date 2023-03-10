import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { EVENT_QUERY } from '../lib/Queries';
import EventItemForm from '../components/forms/EventItemForm';
import EventItems from '../components/tables/EventItems';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles';

function Event() {
	const id = useParams().id;

	const [ event, setEvent ] = useState( [] );
    
	const [fetchedEvent] = useQuery({
		query: EVENT_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = fetchedEvent;

	useEffect( () => {
		if ( data === undefined ) return;
		setEvent( data.event );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Event</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Store</Text>
					<Text>{event.store}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Date</Text>
					<Text>{event.fdate}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Title</Text>
					<Text>{event.title}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Customer</Text>
					<Text>{event.customer}</Text>
				</Box>
			</Flex>
			<EventItemForm event={event} />
			<EventItems eventID={id} />
		</>
	);
}

export default Event;
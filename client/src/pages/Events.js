import { Button, Flex, Heading } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';
import EventsTable from '../components/tables/EventsTable.js';
import AddEventForm from '../components/forms/AddEventForm.js';
import { useState } from 'react';
import EventsItemsTable from '../components/tables/EventsItemsTable.js';

function Events() {

	const [ table, setTable ] = useState( <EventsTable /> );

	function handleTableChange( table ) {
		if ( table === 'events' ) {
			return setTable( <EventsTable /> );
		} else if ( table === 'items' ) {
			return setTable( <EventsItemsTable/> );
		}
	}

	return (
		<>
			<Heading sx={pageHeaderStyle}>Events</Heading>
			<Flex>
				<AddEventForm/>
			</Flex>
			<Flex my="20px" justifyContent="center">
				<Button 
					variant='link' 
					mx="20px" 
					textDecor="underline" 
					onClick={() => handleTableChange( 'events' )}
				>
            Events
				</Button>
				<Button 
					variant='link' 
					mx="20px" 
					textDecor="underline" 
					onClick={() => handleTableChange( 'items' )}
				>
            Items
				</Button>
			</Flex>
			{table}
		</>
	);
}

export default Events;
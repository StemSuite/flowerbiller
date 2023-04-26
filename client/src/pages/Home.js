/* eslint-disable no-unused-vars */
import { Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { pageHeaderStyle } from '../styles/styles';
import moment from 'moment';
import InventoryTable from '../components/tables/InventoryTable';

function Home() {
	let today = moment.utc( new Date() ).format( 'YYYY-MM-DD' );
	const [ inventoryDate, setDate ] = useState( today );

	return (
		<div>
			<Heading sx={pageHeaderStyle}>Inventory</Heading>
			<Flex>
				<FormLabel textAlign="center">Date</FormLabel>
				<Input
					type="date"
					size="sm" 
					maxW="150px"
					name="inventoryDate" 
					value={inventoryDate}
					onChange={( e ) => setDate( e.target.value )}
				>
				</Input>
			</Flex>
			<InventoryTable date={inventoryDate} />
		</div>
	);
}
  
export default Home;
  

import { Flex, Heading } from '@chakra-ui/react';
import { pageHeaderStyle } from '../styles/styles.js';
import PreBooksTable from '../components/tables/PreBooksTable.js';
import AddPreBookForm from '../components/forms/AddPreBookForm.js';

function PreBooks () {
	
	return (
		<>
			<Heading sx={pageHeaderStyle}>Pre-Bookings</Heading>
			<Flex>
				<AddPreBookForm />
			</Flex>
			<PreBooksTable />
		</>
	);
}
  
export default PreBooks;
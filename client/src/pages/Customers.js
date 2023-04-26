import { pageHeaderStyle } from '../styles/styles';
import { Heading } from '@chakra-ui/react';
import StoresTable from '../components/tables/CustomersTable';


function Customers() {
	return (
		<>
			<Heading sx={pageHeaderStyle}>Stores</Heading>
			<StoresTable/>
		</>
	);
}

export default Customers;
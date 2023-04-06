import { Flex, Heading } from '@chakra-ui/react';
import AddOrderForm from '../components/forms/AddOrderForm';
import BillsTable from '../components/tables/BillsTable';
import { pageHeaderStyle } from '../styles/styles';

function Billing() {
	return (
		<>
			<Heading sx={pageHeaderStyle}>Billing</Heading>
			<Flex>
				<AddOrderForm/>
			</Flex>
			<BillsTable />
		</>
	);
}

export default Billing;
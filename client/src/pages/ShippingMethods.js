import { pageHeaderStyle } from '../styles/styles';
import { Heading } from '@chakra-ui/react';
import ShippingMethodsTable from '../components/tables/ShippingMethodsTable';
import AddShippingMethodForm from '../components/forms/AddShippingMethodForm';



function ShippingMethods() {
	return (
		<>
			<Heading sx={pageHeaderStyle}>Shipping Methods</Heading>
			<AddShippingMethodForm/>
			<ShippingMethodsTable/>
		</>
	);
}

export default ShippingMethods;
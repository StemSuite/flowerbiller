import { Heading } from '@chakra-ui/react';
import AddBoxForm from '../components/forms/AddBoxForm';
import BoxesTable from '../components/tables/BoxesTable';
import { pageHeaderStyle } from '../styles/styles';

function Boxes() {
	return (
		<>
			<Heading sx={pageHeaderStyle}>Boxes</Heading>
			<AddBoxForm />
			<BoxesTable />
		</>
	);
}

export default Boxes;
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { pageHeaderStyle } from '../styles/styles';

function Settings() {

	return (
		<div>
			<Heading sx={pageHeaderStyle}>Settings</Heading>
			<Link to={'/vendors'}>
                Vendors
			</Link>
		</div>
	);
}

export default Settings;
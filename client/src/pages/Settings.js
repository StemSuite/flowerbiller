import { Heading, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { pageHeaderStyle } from '../styles/styles';

function Settings() {

	const settingsItems = [
		{ title: 'Vendors', route: '/vendors' },
		{ title: 'Boxes', route: '/boxes' },
	];

	function SettingItem({ item }) {
		return (
			<ListItem>
				<Link to={item.route}>
					{item.title}
				</Link>
			</ListItem>
		);
	}

	return (
		<div>
			<Heading sx={pageHeaderStyle}>Settings</Heading>
			<List>
				{settingsItems.map( ( item, i ) => <SettingItem key={i} item={item}/> )}
			</List>
		</div>
	);
}

export default Settings;
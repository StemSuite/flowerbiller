import { Button, Icon } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

export default function AccountButton() {

	return (
		<Button 
			float="right" 
			width="fit-content" 
			m="10px" p="10px" 
			boxShadow="md" 
			rounded="md" 
			bg="green.300" 
			textColor="white"
		>
			<Icon as={MdAccountCircle}></Icon>
			{' Vogt\'s Flowers'}
		</Button>
	);
}
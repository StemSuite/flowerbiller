import { Button, Icon } from '@chakra-ui/react';
import { GiTrashCan } from 'react-icons/gi';

export default function DeleteButton({ onClick }) {

	return (
		<Button bg="none" onClick={onClick} float="right">
			<Icon as={GiTrashCan}></Icon>
		</Button>
	);
}
import { Button, Icon } from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';
import { addButtonStyle } from '../../styles/styles';

export default function AddButton({ text }) {

	return (
		<Button sx={addButtonStyle} type="submit" size="sm">
			<Icon as={TbPlus}></Icon>
			{text}
		</Button>
	);
}
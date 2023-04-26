import { Button, Icon } from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';
import { buttonStyle } from '../../styles/styles';

export default function AddButton({ text }) {

	return (
		<Button sx={buttonStyle} type="submit" size="sm">
			<Icon as={TbPlus}></Icon>
			{text}
		</Button>
	);
}
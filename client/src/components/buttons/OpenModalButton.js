import { Button, Icon } from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';
import { addButtonStyle } from '../../styles/styles';

export default function OpenModalButton({ text, onClick }) {

	return (
		<Button sx={addButtonStyle} onClick={onClick} marginX="5px">
			<Icon as={TbPlus}></Icon>
			{text}
		</Button>
	);
}
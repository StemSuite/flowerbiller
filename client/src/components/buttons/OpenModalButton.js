import { Button, Icon } from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';
import { buttonStyle } from '../../styles/styles';

export default function OpenModalButton({ text, onClick }) {

	return (
		<Button sx={buttonStyle} onClick={onClick} marginX="5px">
			<Icon as={TbPlus}></Icon>
			{text}
		</Button>
	);
}
import { Button } from '@chakra-ui/react';
import { addButtonStyle } from '../../styles/styles';

export default function SaveButton({ text, clickAction, disabled }) {

	function handleClick() {
		clickAction();
	}

	return (
		<Button sx={addButtonStyle} size="xs" isDisabled={disabled} onClick={handleClick}>
			{text}
		</Button>
	);
}
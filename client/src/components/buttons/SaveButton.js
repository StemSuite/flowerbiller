import { Button } from '@chakra-ui/react';
import { buttonStyle } from '../../styles/styles';

export default function SaveButton({ text, clickAction, disabled }) {

	function handleClick() {
		clickAction();
	}

	return (
		<Button sx={buttonStyle} size="xs" isDisabled={disabled} onClick={handleClick}>
			{text}
		</Button>
	);
}
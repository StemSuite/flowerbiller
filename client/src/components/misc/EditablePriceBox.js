import { Box, Text, Center, HStack, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import EditButtonModal from '../modals/EditButtonModal';

// eslint-disable-next-line no-unused-vars
function EditablePriceBox({ title, currentInput, helperText, handleSubmit }) {

	const [ inputPrice, setPrice ] = useState( '' );

	useEffect( () => {
		if ( currentInput == null ) return;
		setPrice( Number( currentInput.slice( 1 ) ).toFixed( 2 ) );
	}, [currentInput] );

	function onSubmit() {
		handleSubmit( Number( Number( inputPrice ).toFixed( 2 ) ) );
	}

	let modalBody = (
		<Box>
			<HStack>
				<Text>$</Text>
				<NumberInput 
					min={0}
					width="100px"
					size="sm"
					value={inputPrice}
				>
					<NumberInputField
						onChange={( e ) => setPrice( e.target.value )}
					/>
				</NumberInput>
			</HStack>
		</Box>
	);
    
	return (
		<>
			<Box textAlign="center" minWidth="100px">
				<Text textDecor="underline" fontSize="lg">{title}</Text>
				<Center>
					<HStack>
						<Text>{currentInput}</Text>
						<EditButtonModal 
							title={title} 
							modalBody={modalBody} 
							helperText={helperText}
							onSubmit={onSubmit}
						/>
					</HStack>
				</Center>
			</Box>
		</>
	);
}

export default EditablePriceBox;
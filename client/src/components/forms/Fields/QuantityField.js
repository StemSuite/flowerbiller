import { Box, HStack, FormLabel, Text, NumberInput, NumberInputField, FormHelperText } from '@chakra-ui/react';

function QuantityField({ uom, label, name, value, setValue, helperText }) {
 

	function uomDisplay() {
		if ( uom ) return <Text id="prod-uom">{uom}</Text>;
	}

	function helperTextDisplay() {
		if ( helperText ) return (
			<FormHelperText maxW="100px" textAlign="center">
				{helperText}
			</FormHelperText>
		); 
	}

	return (
		<Box>
			<FormLabel textAlign="center">{label}</FormLabel>
			<HStack>
				<NumberInput 
					size="sm" 
					name={name} 
					placeholder="0"
					minW="70px"
					maxW="90px"
					value={value}
					onChange={( value ) => setValue( value )}
				>
					<NumberInputField />
				</NumberInput>
				{uomDisplay()}
			</HStack>
			{helperTextDisplay()}
		</Box>
	);
}

export default QuantityField;

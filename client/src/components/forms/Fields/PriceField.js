
import { Box, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react';

function PriceField({ inputPrice, setPrice }) {

	return(
		<Box>
			<FormLabel size="sm" textAlign="center">$/Unit</FormLabel>
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
		</Box>
	);
}

export default PriceField;

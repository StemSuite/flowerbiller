import { Box, FormLabel, Select } from '@chakra-ui/react';

function ShippingMethodField({ shippingMethods, selectedMethod, changeMethod }) {

	function handleChange( event ) {
		let shipSH = event.target.value;
		changeMethod( shipSH );
	}
  
	return (
		<Box>
			<FormLabel textAlign="center">Shipping Method</FormLabel>
			<Select
				size="sm" 
				name="productField"
				minWidth="150px"
				value={selectedMethod.shortHand}
				onChange={handleChange}
			>
				<option hidden> </option>
				{shippingMethods.map( method => {
					return <option key={method.id}>{method.shortHand}</option>;
				})}
			</Select>
		</Box>
	);
}
  
export default ShippingMethodField;
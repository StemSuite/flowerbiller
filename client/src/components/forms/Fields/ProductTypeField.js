import { Box, FormLabel, Select } from '@chakra-ui/react';
import { useQuery } from 'urql';
import { PRODUCT_TYPES_QUERY } from '../../../lib/Queries';

function ProductTypesField({ value, changeType }) {
  
	const [fetchedTypes] = useQuery({
		query: PRODUCT_TYPES_QUERY
	});

	const { data, fetching, error } = fetchedTypes;

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	let types = data.productTypes;

	function handleChange( event ) {
		let type = data.productTypes.find( type => type.name === event.target.value );
		changeType( type );
	}

	return (
		<Box  minWidth="fit-content">
			<FormLabel textAlign="center">Product Type</FormLabel>
			<Select
				size="sm" 
				name="productField"
				minWidth="150px"
				value={value}
				onChange={handleChange}
			>
				<option hidden> </option>
				{types.map( type => {
					return <option value={type.name} key={type.id}>{type.name}</option>;
				})}
			</Select>
		</Box>
	);
}

export default ProductTypesField;

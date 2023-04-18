import { Box, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { VENDOR_BY_SHORTHAND_QUERY } from '../../../lib/Queries';

function BoxTypeField({ venSH, setBox }) {

	const [ options, setOptions ] = useState( [] );
	
	const [fetchedVen] = useQuery({
		query: VENDOR_BY_SHORTHAND_QUERY,
		variables: { shortHand: venSH }
	});

	const { data, fetching, error } = fetchedVen;       

	useEffect( () => {
		if ( data === undefined || data === null ) return;
		setOptions( data.vendorByShortHand.boxes );
	}, [data] );
  
	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;
	
	return (
		<Box minWidth="fit-content">
			<FormLabel textAlign="block">Box Type</FormLabel>
			<Select 
				size="sm" 
				name="boxField"
				onChange={( e ) => {
					setBox( options[e.target.value] );
				}}
			>
				<option hidden> </option>
				{options.map( ( box, i ) => {
					return <option key={i} value={i}>{box.type}</option>;
				})}
			</Select>
		</Box>
	);
}

export default BoxTypeField;

import {  Center, Select } from '@chakra-ui/react';

function PullFromField({ item }) {
	console.log( item.fillOptions );

	function formatOptions( options ) {
		console.log( options );
		if ( !options ) return;
		return options.map( ( option, i ) => {
			console.log( '??', option );
			return <option key={i}>{`${option.item.product}, ${option.item.variety} via ${option.vendor} arr. on ${option.arrivalDate}`}</option>;
		});
	}

	return (
		<Center justifyContent="center">
			<Select
				size="xs" 
				name="productField"
				minWidth="150px"
				maxWidth="300px"
			>
				{formatOptions( item.fillOptions  )}
			</Select>
		</Center>
	);
}

export default PullFromField;

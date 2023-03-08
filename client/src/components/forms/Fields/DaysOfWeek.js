import { Box, FormLabel, Select } from '@chakra-ui/react';
import { daysOfTheWeek } from '../../../lib/data';

function DaysOfWeek({ selectedDay, changeDay, options, label }) {

	function handleChange( event ) {
		let day = event.target.value;
		changeDay( day );
	}

	return (
		<Box>
			<FormLabel optionalIndicator textAlign="center">{label} </FormLabel>
			<Select
				size="sm" 
				name="productField"
				minWidth="150px"
				value={selectedDay}
				onChange={handleChange}
			>
				<option hidden> </option>
				{options.map( key => {
					return <option key={key} value={key}>{daysOfTheWeek[key]}</option>;
				})}
			</Select>
		</Box>
	);
}
  
export default DaysOfWeek;
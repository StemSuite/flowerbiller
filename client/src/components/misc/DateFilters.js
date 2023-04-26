import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react';
import { buttonStyle } from '../../styles/styles';

function DateFilters({ startDate, endDate, setStartDate, setEndDate, handleFilter }) {

	return (
		<Flex marginX="75px" marginY="20px">
			<Box marginX="20px">
				<FormLabel textAlign="center">Start Date</FormLabel>
				<Input
					type="date"
					size="sm" 
					maxW="150px"
					name="startDate" 
					value={startDate}
					onChange={( e ) => setStartDate( e.target.value )}
				>
				</Input>
			</Box>
			<Box>
				<FormLabel textAlign="center">End Date</FormLabel>
				<Input
					type="date"
					size="sm" 
					maxW="150px"
					name="endDate" 
					value={endDate}
					onChange={( e ) => setEndDate( e.target.value )}
				>
				</Input>
			</Box>
			<Button 
				sx={buttonStyle} 
				size="sm" marginX="7px" 
				alignSelf="end"
				onClick={handleFilter}
			>
                Filter
			</Button>
		</Flex>
	);
}

export default DateFilters;
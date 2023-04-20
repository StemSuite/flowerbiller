import { Box, Text, Center, HStack, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import EditButtonModal from '../modals/EditButtonModal';

function EditableDateBox({ title, currentDate, helperText }) {

	const [ inputDate, setDate ] = useState( '' );

	useEffect( () => {
		if ( currentDate == null ) return;
		let dateArr = currentDate.split( '/' );
		let formatedDate = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
		setDate( formatedDate );
	}, [currentDate] );

	let modalBody = (
		<Box>
			<Input
				type="date"
				size="sm" 
				name="dateField"
				value={inputDate} 
				onChange={( e ) => setDate( e.target.value )}
			>
			</Input>
		</Box>
	);

	return (
		<>
			<Box textAlign="center" minWidth="100px">
				<Text textDecor="underline" fontSize="lg">{title}</Text>
				<Center>
					<HStack>
						<Text>{currentDate}</Text>
						<EditButtonModal title={title} modalBody={modalBody} helperText={helperText} />
					</HStack>
				</Center>
			</Box>
		</>
	);
}

export default EditableDateBox;
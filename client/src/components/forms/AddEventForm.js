import { Box, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useMutation } from 'urql';
import { ADD_EVENT } from '../../lib/Mutations';
import StoreField from './Fields/StoreField';
import AddModal from '../modals/AddModal';

function AddEventForm() {

	const [ selectedStore, setStore ] = useState( '' );
	const [ inputCustomer, setCustomer ] = useState( '' );
	const [ inputTitle, setTitle ] = useState( '' );
	const [ inputDate, setDate ] = useState( '' );

	const [ , addEvent ] = useMutation( ADD_EVENT );

	function resetInputs() {
		setStore( '' );
		setCustomer( '' );
		setTitle( '' );
		setDate( '' );
	}

	function handleAddEvent() {

		let newEvent = {
			store: selectedStore,
			customer: inputCustomer,
			title: inputTitle,
			date: inputDate,
			itemCount: 0
		};

		addEvent({ event: newEvent });
		resetInputs();
	}

	let form = (
		<Form>
			<FormControl as="fieldset" p="20px">
				<Stack>
					<HStack spacing="10px" justifyContent="center">
						<Box>
							<FormLabel textAlign="center">Customer</FormLabel>
							<Input
								size="sm" 
								name="varietyField" 
								value={inputCustomer} 
								onChange={( e ) => setCustomer( e.target.value )}
							>
							</Input>
						</Box>
						<Box>
							<FormLabel textAlign="center">Event Title</FormLabel>
							<Input
								size="sm" 
								name="varietyField" 
								value={inputTitle} 
								onChange={( e ) => setTitle( e.target.value )}
							>
							</Input>
						</Box>
					</HStack>
					<HStack spacing="10px" justifyContent="center">
						<StoreField setStore={setStore}/>
						<Box>
							<FormLabel textAlign="center">Date</FormLabel>
							<Input
								type="date"
								size="sm" 
								name="dateField" 
								value={inputDate} 
								onChange={( e ) => setDate( e.target.value )}
							>
							</Input>
						</Box>
					</HStack>
				</Stack>
			</FormControl>
		</Form>
	);

	return (
		<AddModal title={'New Event'} modalBody={form} onSumbit={handleAddEvent} />
	);
}

export default AddEventForm;
import { Box, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useState } from 'react';
import StoreField from './Fields/StoreField';
import AddModal from '../modals/AddModal';
import { useMutation } from 'urql';
import { ADD_BILL_MUTATION } from '../../lib/Mutations';

function AddOrderForm() {
	let defMUP = 20;

	const [ selectedStore, setStore ] = useState( '' );
	const [ inputDate, setDate ] = useState( '' );
	const [ markUpPer, setMUPer ] = useState( defMUP );

	const [ , addOrder ] = useMutation( ADD_BILL_MUTATION );

	function resetInputs() {
		setStore( '' );
		setDate( '' );
		setMUPer( '' );
	}

	function handleAddEvent() {

		let newOrder = {
			store: selectedStore,
			date: inputDate,
			markUpPercent: Number( markUpPer )
		};

		addOrder({ newBill: newOrder });
		resetInputs();
	}

	let form = (
		<form>
			<FormControl as="fieldset" p="20px">
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
					<Box>
						<FormLabel textAlign="center">Mark Up %</FormLabel>
						<NumberInput
							size="sm" 
							name="markUpField"
							defaultValue={defMUP}
							width="100px"
						>
							<NumberInputField
								value={markUpPer} 
								onChange={( e ) => setMUPer( e.target.value )}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</Box>
				</HStack>
			</FormControl>
		</form>
	);

	return (
		<AddModal title={'New Order'} modalBody={form} onSumbit={handleAddEvent} />
	);
}

export default AddOrderForm;
import { Box, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useMutation } from 'urql';
import { ADD_VENDOR_MUTATION } from '../../lib/Mutations';
import AddModal from '../modals/AddModal';

function AddVendorForm() {
	const [ inputName, setName ] = useState( '' );
	const [ inputSH, setSH ] = useState( '' );

	const [ , addVendor ] = useMutation( ADD_VENDOR_MUTATION );

	function resetInputs() {
		setName( '' );
		setSH( '' );
	}

	function handleAddVendor() {
		let newVendor = {
			name: inputName,
			shortHand: inputSH
		};
		addVendor({ vendor: newVendor });
		resetInputs();
	}
    
	let form = (
		<>
			<Form>
				<FormControl as="fieldset" p="20px">
					<HStack spacing="10px" justifyContent="center">
						<Box>
							<FormLabel textAlign="center">Name</FormLabel>
							<Input
								size="sm" 
								name="nameField" 
								value={inputName} 
								onChange={( e ) => setName( e.target.value )}
							>
							</Input>
						</Box>
						<Box>
							<FormLabel textAlign="center">Short Hand</FormLabel>
							<Input
								size="sm" 
								name="shField" 
								value={inputSH} 
								onChange={( e ) => setSH( e.target.value )}
							>
							</Input>
						</Box>
					</HStack>
				</FormControl>
			</Form>
		</>
	);

	return (
		<AddModal title={'New Vendor'} modalBody={form} onSumbit={handleAddVendor}/>
	);
}

export default AddVendorForm;
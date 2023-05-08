import { Box, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'urql';
import { ADD_BOX_MUTATION } from '../../lib/Mutations';
import AddModal from '../modals/AddModal';

function AddBoxForm() {
	const [ inputType, setType ] = useState( '' );
	const [ inputFBPer, setFBPer ] = useState( '' );
	const [ inputCBF, setCBF ] = useState( '' );

	const [ , addBox ] = useMutation( ADD_BOX_MUTATION );

	function resetInputs() {
		setType( '' );
		setFBPer( '' );
		setCBF( '' );
	}

	function handleAddEvent() {

		let newBox = {
			type: inputType,
			FBE: Number( inputFBPer ),
			CBF: Number( Number( inputCBF ).toFixed( 2 ) )

		};

		addBox({ box: newBox });
		resetInputs();
	}

	let form = (
		<form>
			<FormControl as="fieldset" p="20px">
				<HStack spacing="10px" justifyContent="center">
					<Box>
						<FormLabel textAlign="center">Type</FormLabel>
						<Input
							size="sm" 
							name="typeField" 
							value={inputType} 
							onChange={( e ) => setType( e.target.value )}
						>
						</Input>
					</Box>
					<Box>
						<FormLabel textAlign="center">% of Full Box</FormLabel>
						<Input
							size="sm" 
							name="fbPerField" 
							value={inputFBPer} 
							onChange={( e ) => setFBPer( e.target.value )}
						>
						</Input>
					</Box>
					<Box>
						<FormLabel textAlign="center">Default CBF</FormLabel>
						<Input
							size="sm" 
							name="cbfField" 
							value={inputCBF} 
							onChange={( e ) => setCBF( e.target.value )}
						>
						</Input>
					</Box>
				</HStack>
			</FormControl>
		</form>
	);

	return (
		<AddModal title={'New Box'} modalBody={form} onSumbit={handleAddEvent} />
	);

}

export default AddBoxForm;
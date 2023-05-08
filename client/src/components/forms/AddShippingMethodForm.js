import { Box, FormControl, FormLabel, HStack, Input, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'urql';
import { ADD_SHIPPING_METHOD_MUTATION } from '../../lib/Mutations';
import AddModal from '../modals/AddModal';

function AddShippingMethodForm() {
	const [ inputName, setName ] = useState( '' );
	const [ inputSH, setSH ] = useState( '' );
	const [ inputDTA, setDTA ] = useState( 0 );
	const [ inputPPCBF, setPPCBF ] = useState( 0 );
	const [ inputBoxCharge, setBoxCharge ] = useState( 0 );
	const [ inputFC, setFC ] = useState( 0 );

	const [ , addShippingMethod ] = useMutation( ADD_SHIPPING_METHOD_MUTATION );

	function resetInputs() {
		setName( '' );
		setSH( '' );
		setDTA( 0 );
		setPPCBF( 0 );
		setBoxCharge( 0 );
		setFC( 0 );
	}

	function handleAddEvent() {

		let newShippingMethod = {
			name: inputName,
			shortHand: inputSH,
			daysToArrive: Number( inputDTA ),
			pricePerCBF: Number( Number( inputPPCBF ).toFixed( 2 ) ),
			boxCharge: Number( Number( inputBoxCharge ).toFixed( 2 ) ),
			fuelCharge: Number( Number( inputFC ).toFixed( 2 ) ),
		};

		addShippingMethod({ shippingMethod: newShippingMethod });
		resetInputs();
	}

	let form = (
		<form>
			<FormControl as="fieldset" p="20px">
				<HStack spacing="10px" justifyContent="center" marginY="20px">
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
							maxLength="4"
							value={inputSH} 
							onChange={( e ) => setSH( e.target.value )}
						>
						</Input>
					</Box>
				</HStack>
				<HStack spacing="10px" justifyContent="center" marginY="20px">
					<Box>
						<FormLabel size="sm" textAlign="center">Days To Arrive</FormLabel>
						<NumberInput
							min={0}
							width="100px"
							size="sm"
							value={inputDTA}
						>
							<NumberInputField
								onChange={( e ) => setDTA( e.target.value )}
							/>
						</NumberInput>
					</Box>
					<Box>
						<FormLabel size="sm" textAlign="center">$/CBF</FormLabel>
						<NumberInput
							min={0}
							width="100px"
							size="sm"
							value={inputPPCBF}
						>
							<NumberInputField
								onChange={( e ) => setPPCBF( e.target.value )}
							/>
						</NumberInput>
					</Box>
				</HStack>
				<HStack spacing="10px" justifyContent="center" marginY="20px">
					<Box>
						<FormLabel size="sm" textAlign="center">$/Box</FormLabel>
						<NumberInput
							min={0}
							width="100px"
							size="sm"
							value={inputBoxCharge}
						>
							<NumberInputField
								onChange={( e ) => setBoxCharge( e.target.value )}
							/>
						</NumberInput>
					</Box>
					<Box>
						<FormLabel size="sm" textAlign="center">Fuel Charge</FormLabel>
						<NumberInput
							min={0}
							width="100px"
							size="sm"
							value={inputFC}
						>
							<NumberInputField
								onChange={( e ) => setFC( e.target.value )}
							/>
						</NumberInput>
					</Box>
					
				</HStack>
			</FormControl>
		</form>
	);

	return (
		<AddModal title={'New Shipping Method'} modalBody={form} onSumbit={handleAddEvent} />
	);

}

export default AddShippingMethodForm;
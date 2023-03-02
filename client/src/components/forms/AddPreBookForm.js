import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import VendorField from './Fields/VendorField';
import ShippingMethodField from './Fields/ShippingMethodField';
import { ADD_PREBOOK_MUTATION } from '../../lib/Mutations';
import { VENDORS_QUERY } from '../../lib/Queries';
import { Form } from 'react-router-dom';
import { Box, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import AddModal from '../modals/AddModal';

function AddPreBookForm() {

	const [ , addPreBook ] = useMutation( ADD_PREBOOK_MUTATION );

	const [ selectedVen, setVen ] = useState( '' );
	const [ shippingMethodOptions, setShippingMethodOptions ] = useState( [] );
	const [ selectedShippingMethod, setShippingMethod ] = useState( '' );
	const [ inputShippingDate, setShippingDate ] = useState( '' );
	const [ shippingDayOptions, setShippingDayOptions ] = useState( [] );
	const [ validDate, setValidDate ] = useState( false );
	const [ disabled, setDisabled ] = useState( true );


	const [fetchedVendors] = useQuery({
		query: VENDORS_QUERY
	});

	const { data, fetching, error } = fetchedVendors;

	useEffect( () => {
		if ( data === undefined ) return; 
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function changeVen( venSH ) {
		let vendor = data.vendors.find( ven => ven.shortHand === venSH );
		setVen( vendor );
		setShippingMethodOptions( vendor.shippingMethods );
	}

	function changeShippingOptions( shipSH ) {
		let shippingMethod = shippingMethodOptions.find( method => method.shortHand === shipSH );
		let shippingDays = shippingMethod.shippingDays;
		setShippingMethod( shippingMethod );
		setShippingDayOptions( shippingDays );
	}

	
	function handleShippingDateChange( e ) {
		setShippingDate( e.target.value );
		let newDate = new Date ( e.target.value );
		if( shippingDayOptions.includes( newDate.getDay() + 1 ) ) {
			setValidDate( false );
			setDisabled ( false );
		}else {
			setValidDate( true );
			setDisabled ( true );
		}

	}

	function handleAddPreBook() {

		let newPreBook = {
			vendor : {
				name: selectedVen.name,
				shortHand: selectedVen.shortHand
			},
			shippingMethod: {
				name: selectedShippingMethod.name,
				shortHand: selectedShippingMethod.shortHand
			},
			shippingDate: inputShippingDate,
			daysToArrive: selectedShippingMethod.daysToArrive
		}; 

		addPreBook({ preBook: newPreBook });
	}

	let form = (
		<Form>
			<FormControl isRequired as="fieldset" p="20px">
				<Stack>
					<HStack spacing="10px" justifyContent="center">
						<VendorField 
							vendors={data.vendors} 
							selectedVen={selectedVen} 
							changeVen={changeVen}
						/>
						<ShippingMethodField 
							shippingMethods={shippingMethodOptions} 
							selectedMethod={selectedShippingMethod} 
							changeMethod={changeShippingOptions}
						/>
					</HStack>
					<HStack spacing="10px" justifyContent="center">
						<Box>
							<FormControl isRequired isInvalid={validDate}>
								<FormLabel textAlign="center">Shipping Date</FormLabel>
								<Input
									type="date"
									size="sm" 
									name="startDatField" 
									value={inputShippingDate} 
									onChange={handleShippingDateChange}
								>
								</Input>
								<FormErrorMessage maxW="150px" textAlign="center">{selectedShippingMethod.shortHand} does not ship that day of the week</FormErrorMessage>
							</FormControl>
						</Box>
					</HStack>
				</Stack>
			</FormControl>
		</Form>
	);

	return (
		<AddModal title={'New Pre-Booking'} modalBody={form} onSumbit={handleAddPreBook} disabled={disabled}/>
	);
}



export default AddPreBookForm;
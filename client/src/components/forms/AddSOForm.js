import { useState, useEffect } from 'react';

import { useMutation, useQuery } from 'urql';
import DaysOfWeek from './Fields/DaysOfWeek';
import VendorField from './Fields/VendorField';
import ShippingMethodField from './Fields/ShippingMethodField';
import { ADD_STANDING_ORDER } from '../../lib/Mutations';
import { VENDORS_QUERY } from '../../lib/Queries';
import { Form } from 'react-router-dom';
import { Box, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import AddModal from '../modals/AddModal';

function AddSOForm() {

	const [ , addSO ] = useMutation( ADD_STANDING_ORDER );

	const [ selectedVen, setVen ] = useState( '' );
	const [ shippingMethodOptions, setShippingMethodOptions ] = useState( [] );
	const [ selectedShippingMethod, setShippingMethod ] = useState( '' );
	const [ selectedShippingDay, setShippingDay ] = useState( '' );
	const [ shippingDayOptions, setShippingDayOptions ] = useState( [] );
	const [ inputStartDate, setStartDate ] = useState( '' );
	const [ inputEndDate, setEndDate ] = useState( '' );

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

	function changeShippingDay( day ) {
		setShippingDay( day );
	}

	function handleAddSO() {

		let newStandingOrder = {
			venSH: selectedVen.shortHand,
			shipSH: selectedShippingMethod.shortHand,
			startDate: inputStartDate,
			endDate: inputEndDate,
			shippingDay: Number( selectedShippingDay ),
			daysToArrive: selectedShippingMethod.daysToArrive,
		}; 

		addSO({ standingOrder: newStandingOrder });
	}

	let form = (
		<Form>
			<FormControl as="fieldset" p="20px">
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
							<FormLabel textAlign="center">Start Date</FormLabel>
							<Input
								type="date"
								size="sm" 
								name="startDatField" 
								value={inputStartDate} 
								onChange={( e ) => setStartDate( e.target.value )}
							>
							</Input>
						</Box>
						<Box>
							<FormLabel textAlign="center">End Date</FormLabel>
							<Input
								type="date"
								size="sm" 
								name="endDateField" 
								value={inputStartDate} 
								onChange={( e ) => setEndDate( e.target.value )}
							>
							</Input>
						</Box>
						<DaysOfWeek
							label={'Shipping Day'}
							selectedDay={selectedShippingDay} 
							changeDay={changeShippingDay} 
							options={shippingDayOptions} 
						/>
					</HStack>
				</Stack>
			</FormControl>{}
		</Form>
	);

	return (
		<AddModal title={'New Standing Order'} modalBody={form} onSumbit={handleAddSO} />
	);
}



export default AddSOForm;
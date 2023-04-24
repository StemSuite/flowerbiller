import { Box, Flex, FormLabel, Heading, HStack, Select, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'urql';
import ShipmentItemsTable from '../components/tables/ShipmentIItemTable';
import { SHIPMENT_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';
import EditablePriceBox from '../components/misc/EditablePriceBox';
import EditableDateBox from '../components/misc/EditableDateBox';
import { PER_BOX_CHARGE_HELPER, SURCHARGE_HELPER } from '../lib/helperTexts';
import { UPDATE_SHIPMENT_BOX_CHARGE, UPDATE_SHIPMENT_SURCHARGE } from '../lib/Mutations';

function BoxCountByVen({ vendorBoxCount }) {
	let options = Object.keys( vendorBoxCount );

	const [ selectedOption, setSelected ] = useState ( 'All' );
	if ( !vendorBoxCount['All'] ) return <>...loading</>;

	return (
		<Box width="150px" border="2px" borderColor="green.400" borderRadius="lg">
			<FormLabel  marginY="1px" fontWeight="normal" textDecor="underline" fontSize="lg" textAlign="center"> Box Count</FormLabel>
			<HStack marginBottom="4px">
				<FormLabel textAlign="center"></FormLabel>
				<Select
					size="sm" 
					name="productField"
					width="80px"
					height="25px"
					margin="5px"
					value={selectedOption}
					onChange={( e ) => setSelected( e.target.value )}
				>
					{options.map( option => {
						return <option key={option} value={option}>{option}</option>;
					})}
				</Select>
				<Text>{vendorBoxCount[selectedOption].boxCount}</Text>
			</HStack>
		</Box>
	);

}

function Shipment() {
	const id = useParams().id; 

	const [ shipment, setShipment ] = useState({});
	const [ vendorBoxCount, setVendorBoxCount ] = useState({});
	const [ refetchTable, setRefetchTable ] = useState( false );

	const [ , editSurcharge ] = useMutation( UPDATE_SHIPMENT_SURCHARGE );
	const [ , editSBoxCharge ] = useMutation( UPDATE_SHIPMENT_BOX_CHARGE );

	const [fetchedShipment] = useQuery({
		query: SHIPMENT_QUERY,
		variables: { id },
	});

	const { data, fetching, error } = fetchedShipment;

	useEffect( () => {
		if ( data === undefined ) return;
		setShipment( data.shipment );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function formatPrice( price ) {
		if ( !price ) return '$' + 0.00;
		return '$' + price.toFixed( 2 );
	}

	function updateSurcharge( surcharge ) {
		editSurcharge({ id: shipment.id, totalSurcharge: surcharge })
			.then( () => setRefetchTable( !refetchTable ) );
	}

	function updateBoxCharge( boxCharge ) {
		editSBoxCharge({ id: shipment.id, boxCharge: boxCharge })
			.then( () => setRefetchTable( !refetchTable ) );
	}

	return (
		<>
			<Heading sx={pageHeaderStyle}>Shipment</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" marginY="20px">
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Shipping Method</Text>
					<Text>{shipment.shipSH}</Text>
				</Box>
				<Spacer/>
				<EditableDateBox 
					title={'Shipping Date'} 
					currentDate={shipment.fshippingDate}
				/>
				<Spacer/>
				<EditableDateBox 
					title={'Arrival Date'} 
					currentDate={shipment.farrivalDate}
				/>
			</Flex>
			<Flex mx="10%" justifySelf="center" alignSelf="center" marginY="20px">
				<BoxCountByVen vendorBoxCount={vendorBoxCount}/>
				<Spacer/>
				<EditablePriceBox 
					title={'Per Box Charge'} 
					currentInput={formatPrice( shipment.boxCharge )}
					helperText={PER_BOX_CHARGE_HELPER}
					handleSubmit={updateBoxCharge}
				/>
				<Spacer/>
				<EditablePriceBox 
					title={'Surcharge(s)'} 
					currentInput={formatPrice( shipment.totalSurcharge )}
					helperText={SURCHARGE_HELPER}
					handleSubmit={updateSurcharge}
				/>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Total Shipping Cost </Text>
					<Text>{formatPrice( shipment.totalSurcharge + ( shipment.boxCharge * shipment.itemCount ) )}</Text>
				</Box>
			</Flex>
			<ShipmentItemsTable 
				shipmentID={id} 
				setVendorBoxCount={setVendorBoxCount} 
				refetchTable={refetchTable}
			/>
		</>
	);
}

export default Shipment;
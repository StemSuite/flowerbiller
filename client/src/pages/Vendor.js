import { Box, Checkbox, Flex, Heading, HStack, List, ListItem, NumberInput, NumberInputField, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'urql';
import SaveButton from '../components/buttons/SaveButton';
import { ADD_VENDOR_BOX_MUTATION, ADD_VENDOR_SHIPPING_METHOD_MUTATION, REMOVE_VENDOR_BOX_MUTATION, REMOVE_VENDOR_SHIPPING_METHOD_MUTATION, UPDATE_VENDOR_BOX_CBF } from '../lib/Mutations';
import { BOXES_QUERY, SHIPPING_METHODS_QUERY, VENDOR_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';

function CheckItem({ checked, handleChange, label }) {
	return (
		<ListItem marginLeft="50px" marginY="10px">
			<Checkbox 
				size="md"
				isChecked={checked}
				onChange={handleChange}
			>
				{label}
			</Checkbox>
		</ListItem>
	);
}

function ShippingMethodsList({ vendor }) {

	const [ , addVendorShippingMethod ] = useMutation( ADD_VENDOR_SHIPPING_METHOD_MUTATION );
	const [ , removeVendorShippingMethod ] = useMutation( REMOVE_VENDOR_SHIPPING_METHOD_MUTATION );

	const [ methods, setMethods ] = useState( [] );

	const [fetchedMethods] = useQuery({
		query: SHIPPING_METHODS_QUERY,
	});

	const { data, fetching, error } = fetchedMethods;

	useEffect( () => {
		if ( data === undefined ) return;
		setMethods( data.shippingMethods );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function shippingMethod( method ) {

		let checked = !!vendor.shippingMethods.find( meth => meth.name === method.name );

		function handleChange( e ) {
			
			let editedMethod = {
				name: method.name,
				shortHand: method.shortHand,
				shippingDays: method.shippingDays,
				daysToArrive: method.daysToArrive
			};

			if ( e.target.checked ) {
				addVendorShippingMethod({ id: vendor.id, shippingMethod: editedMethod });
			}else {
				removeVendorShippingMethod({ id: vendor.id, shippingMethod: editedMethod });
			}
		}

		return <CheckItem key={method.name} checked={checked} handleChange={handleChange} label={method.name} />;
	}

	return (
		<>
			<Heading size="md" marginTop="50px">Shipping Methods</Heading>
			<List>
				{methods.map( method => shippingMethod( method ) ) }
			</List>
		</>
	);

}

function BoxesList({ vendor }) {
	let vendorBoxes = {};
	if( vendor.boxes ) {
		vendor.boxes.forEach( box => {
			vendorBoxes[box.type] = box;
		});
	
	}
	const [ , addVendorBox ] = useMutation( ADD_VENDOR_BOX_MUTATION );
	const [ , removeVendorBox ] = useMutation( REMOVE_VENDOR_BOX_MUTATION );

	const [ boxes, setBoxes ] = useState( [] );

	const [fetchedBoxes] = useQuery({
		query: BOXES_QUERY
	});
	
	const { data, fetching, error } = fetchedBoxes;

	useEffect( () => {
		if ( data === undefined ) return;
		setBoxes( data.boxes );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function boxLine( box ) {

		let checked = !!vendorBoxes[box.type];

		function handleChange( e ) {
	
			if ( e.target.checked ) {

				let editedBox = {
					type: box.type,
					perOfFB: box.perOfFB,
					CBF: box.CBF
				};

				addVendorBox({ id: vendor.id, box: editedBox });
			}else {
				removeVendorBox({ id: vendor.id, boxType: box.type });
			}
		}

		function CBFInput() {
			const [ cbfInput, setCBF ] = useState( vendorBoxes[box.type].CBF );
			const [ , updateCBF ] = useMutation( UPDATE_VENDOR_BOX_CBF );

			function handleSave() {
				let boxToUpdate = {
					type: box.type,
					CBF: Number( Number( cbfInput ).toFixed( 2 ) )
				};

				if ( cbfInput !== vendorBoxes[box.type].CBF ) {
					updateCBF({ id: vendor.id, box: boxToUpdate });
				}	
			}

			return (
				<HStack>
					<NumberInput value={cbfInput} size="sm" width="75px" isDisabled={!checked}>
						<NumberInputField onChange={( e ) => setCBF( e.target.value )}/>
					</NumberInput>
					<Text>CBF</Text>
					<SaveButton text={'Save'} disabled={!checked} clickAction={handleSave} />
				</HStack>
			);
		}

		return (
			<HStack key={box.type}>
				<CheckItem checked={checked} handleChange={handleChange} label={box.type} />
				{checked ? <CBFInput /> : <></>}
			</HStack>
		);
	}

	return (
		<>
			<Heading size="md" marginTop="50px">Boxes</Heading>
			<List>
				{boxes.map( box => boxLine( box ) ) }
			</List>
		</>
	);
	
}

function Vendor() {
	let id = useParams().id;

	const [ vendor, setVendor ] = useState( [] );

	const [fetchedVendor] = useQuery({
		query: VENDOR_QUERY,
		variables: { id }
	});

	const { data, fetching, error } = fetchedVendor;

	useEffect( () => {
		if ( data === undefined ) return;
		setVendor( data.vendor );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	return (
		<>
			<Heading sx={pageHeaderStyle}>Vendor: {vendor.name}</Heading>
			<Flex mx="20%" justifySelf="center" alignSelf="center" >
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Name</Text>
					<Text>{vendor.name}</Text>
				</Box>
				<Spacer/>
				<Box textAlign="center" minWidth="100px">
					<Text textDecor="underline" fontSize="lg">Short Hand</Text>
					<Text>{vendor.shortHand}</Text>
				</Box>
			</Flex>
			<ShippingMethodsList vendor={vendor}/>
			<BoxesList vendor={vendor}/>
		</>
	);
}

export default Vendor;
import { Box, Checkbox, Flex, Heading, List, ListItem, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'urql';
import { ADD_VENDOR_SHIPPING_METHOD_MUTATION, REMOVE_VENDOR_SHIPPING_METHOD_MUTATION } from '../lib/Mutations';
import { SHIPPING_METHODS_QUERY, VENDOR_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';

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

		return (
			<ListItem marginLeft="50px">
				<Checkbox 
					size="md"
					isChecked={checked}
					onChange={handleChange}
				>
					{method.name}
				</Checkbox>
			</ListItem>
		);
	}

	return (
		<List>
			{methods.map( method => shippingMethod( method ) ) }
		</List>
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
			<Heading size="md" marginTop="50px">Shipping Methods</Heading>
			<ShippingMethodsList vendor={vendor}/>
		</>
	);
}

export default Vendor;
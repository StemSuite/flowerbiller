import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import AddVendorForm from '../components/forms/AddVendorFrom';
import { VENDORS_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';


function Vendors() {

	const [ vendors, setVendors ] = useState( [] );

    

	const [fetchedVendors] = useQuery({
		query: VENDORS_QUERY
	});

	const { data, fetching, error } = fetchedVendors;

	useEffect( () => {
		if ( data === undefined ) return;
		setVendors( data.vendors );
	}, [data] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function VendorsLinks() {
		return vendors.map( ven => {
			let linkTo = `../vendor/${ven.id}`;
			return <li key={ven.id}><Link to={linkTo} key={ven.id}>{ven.name}</Link></li>;
		});
	}

	return (
		<>
			<Heading sx={pageHeaderStyle}>Vendors</Heading>
			<Flex>
				<AddVendorForm/>
			</Flex>
			<ul>
				<VendorsLinks/>
			</ul>
		</>
	);
}

export default Vendors;
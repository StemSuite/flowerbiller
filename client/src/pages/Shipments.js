import { Heading, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import ShipmentsTable from '../components/tables/ShipmentsTable';
import { SHIPMENTS_BY_DATE_QUERY } from '../lib/Queries';
import { pageHeaderStyle } from '../styles/styles';
import moment from 'moment';
import DateFilters from '../components/misc/DateFilters';

function Shipments () {
	let today = moment();
	const [ startDate, setStartDate ] = useState( today.subtract( '1', 'month' ).format( 'YYYY-MM-DD' ) );
	const [ endDate, setEndDate ] = useState( today.add( '2', 'month' ).format( 'YYYY-MM-DD' ) );
	
	const [ shipments, setShipments ] = useState( [] );
	const [ filter, setFilter ] = useState( false );

	const [fetchedShipments] = useQuery({
		query: SHIPMENTS_BY_DATE_QUERY,
		variables: { startDate: startDate, endDate: endDate },
		pause: filter
	});

	const { data, fetching, error } = fetchedShipments;

	useEffect( () => {
		if ( data === undefined ) return;
		setShipments( data.shipmentsByDates );
		setFilter( true );
	}, [data] );


	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function handleFilter() {
		setFilter( false );
	}

	return (
		<div>
			<Heading sx={pageHeaderStyle}>Shipments</Heading>
			<DateFilters
				startDate={startDate}
				endDate={endDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				handleFilter={handleFilter}
			/>
			<ShipmentsTable shipments={shipments} />
		</div>
	);
}

export default Shipments;
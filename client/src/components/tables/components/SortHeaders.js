import { TbArrowsSort } from 'react-icons/tb';
import { Icon, Th } from '@chakra-ui/react';
import { useEffect } from 'react';
import sort from '../../../lib/Sort';


function SortHeaders({ items, fields, sortValue, setSort, setItems }) {

	useEffect( () =>{
		let prodsCopy = [...items];
		let sortedProds = sort[sortValue.key]( prodsCopy );
		setItems( sortValue.ascending ? sortedProds : sortedProds.reverse() );
	},[ items, sortValue ] );

	function changeSort( key, ascending ) {
		setSort({ key: key, ascending: ascending });
	}


	return fields.map( ( field, i ) => {
		if ( field.sort ) {
			return (
				<Th 
					textAlign="center"
					textDecor="underline"
					cursor="pointer"
					key={i} 
					onClick={() => changeSort( field.sort, !sortValue.ascending )}
				>
					{field.header}
					<Icon as={TbArrowsSort}></Icon>
				</Th>
			);
		}
		return <Th textAlign="center" key={i}>{field.header}</Th>;
	});
}

export default SortHeaders;
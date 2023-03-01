import { TableContainer, Table, Thead, Tr, Tbody, Th, Icon, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import sort from '../../lib/Sort.js';
import { TbArrowsSort } from 'react-icons/tb';
import DeleteButton from '../buttons/DeleteButton.js';


function ItemsList({ items, handleDeleteItem, fields }) {
	const [ sortValue, setSort ] = useState({ key: fields[0].key, ascending: true });
	const [ sortedItems, setItems ] = useState( sort[sortValue.key]( items ) );


	useEffect( () =>{
		let prodsCopy = [...items];
		let sortedProds = sort[sortValue.key]( prodsCopy );
		setItems( sortValue.ascending ? sortedProds : sortedProds.reverse() );
	},[ items, sortValue ] );

	function changeSort( key, ascending ) {
		setSort({ key: key, ascending: ascending });
	}

	function deleteOption( itemID ) {
		if ( handleDeleteItem )  {
			return (
				<Td maxWidth="20px" alignSelf="center">
					<DeleteButton onClick={() => handleDeleteItem( itemID )}></DeleteButton>
				</Td>
			);
		}
	}

	function formatRow( item, field ) {
		if ( !item[field.key] ) return '';
		if ( typeof item[field.key] === 'object' ) {
			if ( item[field.key].length === 0 ) return '--';
			return item[field.key].map( ( str, i ) => {
				return <span key={i}>{item[field.key][i+1] ? `${str}, ` : str}</span>;
			});
		}
		return item[field.key];
	}

	function Headers() {
		return fields.map( ( field, i ) => {
			if ( field.sort ) {
				return <Th 
					textAlign="center"
					textDecor="underline"
					cursor="pointer"
					key={i} 
					onClick={() => changeSort( field.key, !sortValue.ascending )}>
					{field.header}
					<Icon as={TbArrowsSort}></Icon>
				</Th>;
			}
			return <Th textAlign="center" key={i}>{field.header}</Th>;
		});
	}

	function Items({ items }) {
		return items.map( item => {
			let id = ( item.id || item._id );

			if ( item.pricePerUnit && typeof item.pricePerUnit !== 'string' ) item.pricePerUnit = '$' + item.pricePerUnit.toFixed( 2 );
			if ( item.totalPrice && typeof item.totalPrice !== 'string' ) item.totalPrice = '$' + item.totalPrice.toFixed( 2 );

			return (
				<Tr  key={id}>
					{fields.map( ( field, i ) => <Td textAlign="center" key={i}>{formatRow( item, field )}</Td> )}
					{deleteOption( id )}
				</Tr>
			);
		});
	}

	return (
		<TableContainer overflowX="unset" overflowY="unset"  >
			<Table variant="striped" colorScheme="gray"  border-collapase="sperate" >
				<Thead bg="white" position="sticky" top={0} zIndex="docked" borderBottomColor="green.400" borderBottomWidth="4px">
					<Tr>
						<Headers />
					</Tr>
				</Thead>
				<Tbody textAlign="center">
					<Items items={sortedItems}/>
				</Tbody>
			</Table>
		</TableContainer>
	);

}

export default ItemsList;
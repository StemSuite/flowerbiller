import { TableContainer, Table, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import { useState } from 'react';
import sort from '../../../lib/Sort.js';
import DeleteButton from '../../buttons/DeleteButton.js';
import SortHeaders from './SortHeaders.js';
import PlainLine from './PlainLine.js';
import LinkedLine from './LinkedLine.js';


function ItemsList({ items, handleDeleteItem, fields, path }) {
	const [ sortValue, setSort ] = useState({ key: fields[0].sort, ascending: true });
	const [ sortedItems, setItems ] = useState( sort[sortValue.key]( items ) );

	// eslint-disable-next-line no-unused-vars
	function deleteOption( itemID ) {
		if ( handleDeleteItem )  {
			return (
				<Td maxWidth="20px" alignSelf="center">
					<DeleteButton onClick={() => handleDeleteItem( itemID )}></DeleteButton>
				</Td>
			);
		}
	}

	function Items({ items }) {
		console.log( items );
		if ( path ) return <LinkedLine items={items} fields={fields} path={path}/>;
		return <PlainLine items={items} fields={fields} />;
	}

	return (
		<TableContainer overflowX="unset" overflowY="unset"  >
			<Table variant="striped" colorScheme="gray"  border-collapase="sperate" >
				<Thead bg="white" position="sticky" top={0} zIndex="docked" borderBottomColor="green.400" borderBottomWidth="4px">
					<Tr>
						<SortHeaders 
							items={items} 
							fields={fields} 
							sortValue={sortValue} 
							setSort={setSort} 
							setItems={setItems} />
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
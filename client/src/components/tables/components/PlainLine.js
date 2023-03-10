import { Td, Tr } from '@chakra-ui/react';
import { lineItemStyle } from '../../../styles/styles';

function PlainLine ({ items, fields }) {
	return items.map( ( item, i )=> {
		let id = ( item.id || item._id || i );
		return (
			<Tr key={id}>
				{fields.map( ( field, i ) => {
					return (
						<Td sx={lineItemStyle} key={i}>
							{field.format( item )}
						</Td>
					);
				})}
			</Tr>
		);
	});
}

export default PlainLine;
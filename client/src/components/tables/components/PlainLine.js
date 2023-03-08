import { Td, Tr } from '@chakra-ui/react';
import { lineItemStyle } from '../../../styles/styles';

function PlainLine ({ items, fields }) {
	return items.map( item => {
		let id = ( item.id || item._id );
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
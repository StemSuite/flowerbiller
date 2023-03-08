import { Box, LinkBox, LinkOverlay, Tr, Td } from '@chakra-ui/react';
import { lineItemStyle } from '../../../styles/styles';

function LinkedLine({ items, fields, path }) {

	return items.map( item => {
		let id = ( item.id || item._id );
		return (
			<Tr key={id}>
				{fields.map( ( field, i ) => {
					return (
						<Td sx={lineItemStyle} key={i}>
							<LinkBox as={Box} width="full" height="full">
								<LinkOverlay 
									href={`/${path}/${id}`} 
									display
								>
									{field.format( item )}
								</LinkOverlay>
							</LinkBox>
						</Td>
					);
				})}
        
			</Tr>
		);
	});
}

export default LinkedLine;
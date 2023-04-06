import {  Center, Select } from '@chakra-ui/react';
import { useMutation } from 'urql';
import { UPDATE_FILLEDFROM_MUTATION, UPDATE_INVENTORY_MUTATION } from '../../../lib/Mutations';

function PullFromField({ sale }) {
	const [ , updateInventory ] = useMutation( UPDATE_INVENTORY_MUTATION );
	const [ , updateFilledFrom ] = useMutation( UPDATE_FILLEDFROM_MUTATION );

	let selected = sale.filledFrom || null;

	function isAst( option ) {
		if ( option.item.variety === 'Ast' ) {
			return <option key={option.id} value={option.id}>{`(Ast) ${option.vendor} arr: ${option.arrivalDate}`}</option>;
		}
		return <option key={option.id} value={option.id}>{`${option.vendor} arr: ${option.arrivalDate}`}</option>;
	}

	function selectedOption() {
		if ( selected ) {
			let selectedOption = sale.fillOptions.find( opt => opt.id === selected );
			return (
				<>
					{isAst( selectedOption )}
					<option> </option>;
				</>
			);
		}
		return <option> </option>;
	}

	function otherOptions() {
		if ( !sale.fillOptions ) return;
		let otherOptions = sale.fillOptions.filter( opt => opt.id !== selected );
        
		return otherOptions.map( ( option ) => {
			return isAst( option );
		});
	}


	function handleChange( e ) {
		let previousSelection = selected;
		let currentSelection = e.target.value;
		selected = currentSelection;

		if ( currentSelection ) {
			updateFilledFrom({ id: sale._id, newFilledFrom: currentSelection });
			updateInventory({ id: currentSelection, qty: ( sale.item.quantity * -1 ) });
		}else {
			updateFilledFrom({ id: sale._id, newFilledFrom: null });
		}

		if ( previousSelection ) updateInventory({ id: previousSelection, qty: sale.item.quantity });
	}


	return (
		<Center justifyContent="center">
			<Select
				size="xs" 
				name="productField"
				width="200px"
				value={selected || ''}
				onChange={handleChange}
			>
				{selectedOption()}
				{otherOptions()}
			</Select>
		</Center>
	);
}

export default PullFromField;

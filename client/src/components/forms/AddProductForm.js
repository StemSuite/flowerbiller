import { useState } from 'react';
import { useMutation } from 'urql';
import { ADD_PRODUCT_MUTATION } from '../../lib/Mutations';
import ProductTypesField from '../forms/Fields/ProductTypeField';
import AddModal from '../modals/AddModal';
import { Form } from 'react-router-dom';
import { Box, FormControl, FormHelperText, FormLabel, HStack, Input, Select, Stack } from '@chakra-ui/react';
import QuantityField from '../forms/Fields/QuantityField';



function AddProductForm() {
	const [ , addProduct ] = useMutation( ADD_PRODUCT_MUTATION );

	const [ selectedType, setType ] = useState( null );
	const [ inputProduct, setNewProduct ] = useState( '' );
	const [ UOMs, setUOMs ] = useState( [] );
	const [ selectedUOM, setUOM ] = useState( '' );
	const [ inputSizes, setSizes ] = useState( '' );
	const [ expDays, setExpDays ] = useState( '' );

	function formatSizes( sizes ) {
		return sizes.split( ',' ).map( size => size.trim() );
	}

	function changeType( type ) {
		setType( type || {});
		setUOMs( type.uoms || [] );
		setExpDays( type.defaultDaysToExp );
	}

	function resetInputs() {
		setType( null );
		setNewProduct( '' );
		setUOMs( [] );
		setUOM( '' );
		setSizes( '' );
		setExpDays( '' );
	}


	function handleAddProduct() {
    
		let newProduct = {
			type: selectedType.id,
			name:  inputProduct,
			uom: selectedUOM,
			daysToExp: Number( expDays )
		};

		if ( inputSizes ) newProduct.sizes = formatSizes( inputSizes );

		addProduct({ product: newProduct });
		resetInputs();
	}
	const form = (
		<>
			<Form>
				<FormControl as="fieldset" p="20px">
					<Stack>
						<HStack spacing="10px" justifyContent="center">
							<ProductTypesField setType={setType} changeType={changeType}/>
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">Product Name</FormLabel>
								<Input
									size="sm" 
									name="productField" 
									value={inputProduct} 
									onChange={( e ) => setNewProduct( e.target.value )}
								>    
								</Input>
							</Box>
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">UoM</FormLabel>
								<Select
									size="sm" 
									name="uomField" 
									value={selectedUOM} 
									onChange={( e ) => setUOM( e.target.value )}
								>
									<option hidden> </option>
									{UOMs.map( ( uom, i ) => {
										return <option value={uom} key={i}>{uom}</option>;
									})}
								</Select>
							</Box>
						</HStack>
						<HStack spacing="10px" justifyContent="center">
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">Sizes</FormLabel>
								<Input
									size="sm" 
									name="sizesField" 
									value={inputSizes} 
									onChange={( e ) => setSizes( e.target.value )}
								>    
								</Input>
								<FormHelperText  maxW="150px" textAlign="center">
                                    Seperate multiple by comma (,)
								</FormHelperText>
							</Box>
							<QuantityField 
								label={'Days to Exp'}
								value={expDays}
								setValue={setExpDays}
								name={'expField'}
								helperText={'Clear input for no expiration'}
							/>
						</HStack>
					</Stack>
				</FormControl>
			</Form>

		</>
	);

	return (
		<AddModal title={'New Product'} modalBody={form} onSumbit={handleAddProduct} />
	);
}

export default AddProductForm;
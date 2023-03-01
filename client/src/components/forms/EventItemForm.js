import {  useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import { Form } from 'react-router-dom';
import { Box, FormControl, HStack } from '@chakra-ui/react';
import { ADD_EVENT_ITEM } from '../../lib/Mutations.js';
import ProductField from './Fields/ProductField.js';
import LengthField from './Fields/SizeField.js';
import VarietyField from './Fields/VarietyField.js';
import QuantityField from './Fields/QuantityField.js';
import AddButton from '../buttons/AddButton.js';
import { PRODUCTS_AND_VARIETIES_QUERY } from '../../lib/Queries';

function EventItemForm({ eventID, eventDate }) {
	const [ products, setProducts ] = useState( [] );
	const [ selectedProduct, setProduct ] = useState({});
	const [ selectedVariety, setVariety ] = useState( '' );
	const [ selectedSize, setSize ] = useState( '' );
	const [ inputQty, setQty ] = useState( '' );
	const [ prodUOM, setUOM ] = useState( null );
	const inputProd = useRef( selectedProduct );
  
	const [ , addEventItem ] = useMutation( ADD_EVENT_ITEM );

	const [fetchedProds] = useQuery({
		query: PRODUCTS_AND_VARIETIES_QUERY
	});

	const { data, fetching, error } = fetchedProds;       
  
	useEffect( () => {
		if ( data === undefined ) return;
		setProducts( data.products );
	}, [ data, setProducts ] );
    
	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	function changeProduct( productName ) {
		let product = products.find( prd => prd.name === productName );
		if ( setUOM ) setUOM( product.uom );
		setVariety( '' );
		setSize( '' );
		setProduct( product || {});
	}

	function resetFields() {
		setQty( '' );
		setProduct( '' );
		setVariety( '' );
		setSize( '' );
	}
  
	function addProduct( e ) {
		e.preventDefault();
		let newProd = {
			eventID: eventID,
			product: selectedProduct.name,
			variety: selectedVariety,
			size: selectedSize,
			uom: prodUOM,
			quantity: Number( inputQty ),
			dateSold: eventDate
		};
      
		addEventItem({ eventID: eventID, item: newProd });
  
		resetFields();
		setProduct({});
		setUOM( null );
		inputProd.current.focus();
	}
  
	return(
		<Form onSubmit={addProduct} >
			<FormControl as="fieldset" p="20px" >
				<HStack spacing="10px" justifyContent="center" >
					<ProductField 
						inputProd={inputProd} 
						products={products}
						changeProduct={changeProduct}
						value={selectedProduct.name || ''} 
					/>
					<VarietyField product={selectedProduct} setVariety={setVariety}/>
					<LengthField validSizes={selectedProduct.sizes} setSize={setSize}/>
					<QuantityField 
						label={'QTY'} 
						name={'quantity'} 
						value={inputQty}
						setValue={setQty}
						uom={prodUOM}
					/>
					<Box alignSelf="end">
						<AddButton text={'add'}/>
					</Box>
				</HStack>
			</FormControl>
		</Form>
	);
}
  
export default EventItemForm;
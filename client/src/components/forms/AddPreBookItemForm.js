import {  useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import { ADD_PREBOOK_ITEM } from '../../lib/Mutations.js';
import ProductField from './Fields/ProductField.js';
import LengthField from './Fields/SizeField.js';
import VarietyField from './Fields/VarietyField.js';
import BoxTypeField from './Fields/BoxTypeField.js';
import QuantityField from './Fields/QuantityField.js';
import PriceField from './Fields/PriceField.js';
import { PRODUCTS_AND_VARIETIES_QUERY } from '../../lib/Queries';
import { Box, FormControl, HStack } from '@chakra-ui/react';
import AddButton from '../buttons/AddButton.js';
import { Form } from 'react-router-dom';

function PreBookItemForm({ preBook }) {
	const [ products, setProducts ] = useState( [] );
	const [ selectedProduct, setProduct ] = useState({});
	const [ selectedVariety, setVariety ] = useState( '' );
	const [ selectedSize, setSize ] = useState( '' );
	const [ selectedBoxType, setBoxType ] = useState( '' );
	const [ inputBoxCount, setBoxCount ] = useState( '' );
	const [ inputQtyPerBox, setQtyPerBox ] = useState( '' );
	const [ inputpricePerUnit, setPricePerUnit ] = useState( '' );
	const [ prodUOM, setUOM ] = useState( null );
	const inputProd = useRef( selectedProduct );


	const [ , addPreBookItem ] = useMutation( ADD_PREBOOK_ITEM );

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
		setPricePerUnit( '' );
		setProduct( '' );
		setVariety( '' );
		setSize( '' );
		setBoxType( '' );
		setBoxCount( '' );
		setQtyPerBox( '' );
		setUOM( null );
	}

	function addProduct( e ) {
		e.preventDefault();

		let newItem = { 
			product: selectedProduct.name,
			variety: selectedVariety,
			size: selectedSize,
			uom: prodUOM,
			boxType: selectedBoxType,
			boxCount: Number( inputBoxCount ),
			qtyPerBox: Number( inputQtyPerBox ),
			pricePerUnit: Number( Number( inputpricePerUnit ).toFixed( 2 ) ),
			daysToExp: selectedProduct.daysToExp                
		};

		addPreBookItem({ preBookId: preBook.id, item: newItem });

		setProduct({});
		resetFields();
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
						label={'Boxes'} 
						name={'boxCount'} 
						value={inputBoxCount}
						setValue={setBoxCount}
					/>
					<BoxTypeField value={selectedBoxType} setBoxType={setBoxType}/>
					<QuantityField 
						label={'QTY/Box'} 
						name={'qtyPerBox'}
						value={inputQtyPerBox}
						setValue={setQtyPerBox} 
						uom={prodUOM}
					/>
					<PriceField value={inputpricePerUnit} setPrice={setPricePerUnit}/>
					<Box alignSelf="end">
						<AddButton text={'add'}/>
					</Box>
				</HStack>
			</FormControl>
		</Form>
	);
}

export default PreBookItemForm;

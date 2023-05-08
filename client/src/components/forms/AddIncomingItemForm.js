import {  useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import ProductField from './Fields/ProductField.js';
import LengthField from './Fields/SizeField.js';
import VarietyField from './Fields/VarietyField.js';
import BoxTypeField from './Fields/BoxTypeField.js';
import QuantityField from './Fields/QuantityField.js';
import PriceField from './Fields/PriceField.js';
import { PRODUCTS_AND_VARIETIES_QUERY } from '../../lib/Queries';
import { Box, FormControl, HStack } from '@chakra-ui/react';
import AddButton from '../buttons/AddButton.js';

function IncomingItemForm({ order, mutation }) {
	const [ products, setProducts ] = useState( [] );
	const [ selectedProduct, setProduct ] = useState({});
	const [ selectedVariety, setVariety ] = useState( '' );
	const [ selectedSize, setSize ] = useState( '' );
	const [ selectedBox, setBox ] = useState( [] );
	const [ inputBoxCount, setBoxCount ] = useState( '' );
	const [ inputQtyPerBox, setQtyPerBox ] = useState( '' );
	const [ inputpricePerUnit, setPricePerUnit ] = useState( '' );
	const [ prodUOM, setUOM ] = useState( null );
	const inputProd = useRef( selectedProduct );


	const [ , addItem ] = useMutation( mutation );

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

	function resetFields( e ) {
		setUOM( null );
		setPricePerUnit( '' );
		setProduct({});
		setVariety( '' );
		setSize( '' );
		setBox( [] );
		setBoxCount( '' );
		setQtyPerBox( '' );
		e.target.reset();
	}

	function addProduct( e ) {
		e.preventDefault();

		let newItem = { 
			product: selectedProduct.name,
			variety: selectedVariety,
			size: selectedSize,
			uom: prodUOM,
			box: { type: selectedBox.type, FBE: selectedBox.FBE, CBF: selectedBox.CBF },
			boxCount: Number( inputBoxCount ),
			qtyPerBox: Number( inputQtyPerBox ),
			pricePerUnit: Number( Number( inputpricePerUnit ).toFixed( 2 ) ),
			daysToExp: selectedProduct.daysToExp                
		};

		addItem({ orderID: ( order._id|| order.id ), item: newItem });
		
		inputProd.current.focus();
		resetFields( e );
	}

	return(
		<form onSubmit={addProduct} >
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
					<BoxTypeField venSH={order.venSH} setBox={setBox}/>
					<QuantityField 
						label={'QTY/Box'} 
						name={'qtyPerBox'}
						value={inputQtyPerBox}
						setValue={setQtyPerBox} 
						uom={prodUOM}
					/>
					<PriceField inputPrice={inputpricePerUnit} setPrice={setPricePerUnit}/>
					<Box alignSelf="end">
						<AddButton text={'add'}/>
					</Box>
				</HStack>
			</FormControl>
		</form>
	);
}

export default IncomingItemForm;
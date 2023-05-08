import { useState, useEffect } from 'react';
import { useMutation } from 'urql';
import { ADD_VARIETY_MUTATION } from '../../lib/Mutations';
import ProductField from '../forms/Fields/ProductField';
import { PRODUCTS_ONLY_QUERY } from '../../lib/Queries';
import { useQuery } from 'urql';
import { Box, FormControl, FormHelperText, FormLabel, HStack, Input, Stack, useToast } from '@chakra-ui/react';
import AddModal from '../modals/AddModal';

function AddVarietyForm() {
	const toast = useToast();
	const [ products, setProducts ] = useState( [] );
	const [ selectedProduct, setProduct ] = useState({});
	const [ inputVariety, setVariety ] = useState( '' );
	const [ inputColors, setColors ] = useState( '' );
	const [ inputTags, setTags ] = useState( '' );

	const [ , addVariety ] = useMutation( ADD_VARIETY_MUTATION );

	const [fetchedProds] = useQuery({
		query: PRODUCTS_ONLY_QUERY
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
		setVariety( '' );
		setProduct( product || {});
	}

	function resetInputs() {
		setVariety( '' );
		setColors( '' );
		setTags( '' );
	}
    

	function formatWords( words ) {
		return words.split( ',' ).map( str => {
			str = str.toLowerCase().trim();
			str = str[0].toUpperCase() + str.slice( 1 );
			return str;
		});
	}

	function successToast() {
		toast({
			title: 'Variety created.',
			description: `${selectedProduct.name}, ${inputVariety} added!`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function handleAddVariety() {
		let newVariety = {
			name: inputVariety
		}; 

		if ( inputColors ) newVariety.colors = formatWords( inputColors );
		if ( inputTags ) newVariety.tags = formatWords( inputTags );

		addVariety({ productID: selectedProduct.id, variety: newVariety });
		successToast();
		resetInputs();
	}

	let form = (
		<>
			<form>
				<FormControl as="fieldset" p="20px">
					<Stack>
						<HStack spacing="10px" justifyContent="center">
							<ProductField 
								products={products}
								changeProduct={changeProduct}
								value={selectedProduct.name || ''} 
							/>
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">Variety Name</FormLabel>
								<Input
									size="sm" 
									name="varietyField" 
									value={inputVariety} 
									onChange={( e ) => setVariety( e.target.value )}
								>    
								</Input>
							</Box>
						</HStack>
						<HStack spacing="10px" justifyContent="center">
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">Colors</FormLabel>
								<Input
									size="sm" 
									name="sizesField" 
									value={inputColors} 
									onChange={( e ) => setColors( e.target.value )}
								>    
								</Input>
								<FormHelperText  maxW="150px" textAlign="center">
                                    Seperate multiple by comma (,)
								</FormHelperText>
							</Box>
							<Box  minWidth="fit-content">
								<FormLabel textAlign="center">Tags</FormLabel>
								<Input
									size="sm" 
									name="sizesField" 
									value={inputTags} 
									onChange={( e ) => setTags( e.target.value )}
								>    
								</Input>
								<FormHelperText  maxW="150px" textAlign="center">
                                    Seperate multiple by comma (,)
								</FormHelperText>
							</Box>
						</HStack>
					</Stack>
				</FormControl>
			</form>
		</>
	);

	return (
		<AddModal title={'New Variety'} modalBody={form} onSumbit={handleAddVariety} preventClose={true} />
	);
}

export default AddVarietyForm;

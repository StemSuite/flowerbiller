import { Box, Center, HStack, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { ADD_BILL_ITEM, UPDATE_SALE_QTY_MUATION } from '../../lib/Mutations';
import {  BILL_INVENTORY_QUERY } from '../../lib/Queries';
import ItemsList from './components/ItemsList';
import { fullProduct } from './ItemFormats';

function changeBillQtyInput( bill, line ) {

	let qty = line.soldQty.length > 0 ? line.soldQty[0].qtySold : '';

	const [ inputValue, setValue ] = useState( qty );
	const [ currentQty, setCurrentQty ] = useState( qty );

	const [ , updateSaleQty ] = useMutation( UPDATE_SALE_QTY_MUATION );
	const [ , addBillItem ] = useMutation( ADD_BILL_ITEM );

	function handleInputChange( inputValue ) {
		let newQuantity = Number( inputValue );
		if ( currentQty !== newQuantity ) {
			setCurrentQty( newQuantity );
			if ( line.soldQty.length > 0 ) {
				updateSaleQty({ id: line.soldQty[0].saleID, newQuantity: Number( inputValue ) });
				if ( inputValue == 0 ) line.soldQty = [];
			}else {

				let newItem = {
					product: line.item.product,
					variety: line.item.variety,
					size: line.item.size,
					uom: line.item.uom,
					quantity:  Number( inputValue )

				};

				let newSale = {
					billID: bill._id,
					store: bill.store,
					dateSold: bill.fdate,
					item: newItem
				};

				addBillItem({ newSale: newSale }).then( res => {
					let data = res.data.addBillItem;
					line.soldQty.unshift({ saleID: data._id, qtySold: data.item.quantity });
				});
			}
		}
	}

	useEffect( () => {
		if ( currentQty !== inputValue ) {
			const timeOutId = setTimeout( () => handleInputChange( inputValue ) , 3000 );
			return () => clearTimeout( timeOutId );
		}
	}, [inputValue] );
	

	return (
		<Center>
			<Box>
				<HStack>
					<NumberInput 
						size="sm" 
						width="75px"
						value={inputValue}
					>
						<NumberInputField
							textAlign="center"
							onChange={( e ) => setValue( e.target.value )}
						/>
					</NumberInput>
					<Text>{line.item.uom}</Text>
				</HStack>
			</Box>
		</Center>
	);
}


function BillItemsTable ({ bill }) {
	let date = bill.fdate;

	const [ items, setItems ] = useState( [] );

	const [fetchedItems] = useQuery({
		query: BILL_INVENTORY_QUERY,
		variables: { date: date, billID: bill._id }
	});

	const { data, fetching, error } = fetchedItems;

	useEffect( () => {
		if ( data === undefined ) return;
		setItems( data.billInventory || [] );
	}, [ data, date ] );

	if ( fetching ) return 'Loading...';
	if ( error ) return <pre>{error.message}</pre>;

	const fields = [ 
		{ 
			header: 'Product', 
			sort: 'product', 
			format: ( line ) => fullProduct( line.item )
		},
		{ 
			header: 'Qty', 
			format: ( line ) => changeBillQtyInput( bill, line  )
		},
	];

	return (
		<ItemsList
			items={items}
			fields={fields}
		/>
	);
    
}

export default BillItemsTable;
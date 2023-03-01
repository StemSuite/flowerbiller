
function sortByProduct( prods ) {
	return prods.sort( ( a, b ) => {
		if ( a.product !== b.product ) return a.product.localeCompare( b.product );
		if ( a.var !== b.variety ) return a.variety.localeCompare( b.variety );
		if ( a.size !== b.size ) return parseInt( a.size ) < parseInt( b.size );
		if ( a.pricePerUnit !== b.pricePerUnit ) return a.pricePerUnit - b.pricePerUnit;
		if ( a.totalQty !== b.totalQty ) return a.totalQty - b.totalQty;
		if ( a.ven !== b.ven ) return a.ven.localeCompare( b.ven );
		return 0;
	});
}

function sortByTotalQty( prods ) {
	return prods.sort( ( a, b ) => {
		if ( a.totalQty !== b.totalQty ) return a.totalQty - b.totalQty;
		if ( a.ven !== b.ven ) return a.ven.localeCompare( b.ven );
		if ( a.prod !== b.prod ) return a.prod.localeCompare( b.prod );
		if ( a.var !== b.var ) return a.var.localeCompare( b.var );
		if ( a.len !== b.len ) return parseInt( a.len ) < parseInt( b.len );
		if ( a.pricePerUnit !== b.pricePerUnit ) return a.pricePerUnit - b.pricePerUnit;
		return 0;
	});
}

function sortByCustomer( items ) {
	return items.sort( ( a, b ) => {
		if ( a.customer !== b.customer ) return a.customer.localeCompare( b.customer );
		return 0;
	});
}

function sortByVenSH( items ) {
	return items.sort( ( a, b ) => {
		if ( a.venSH !== b.venSH ) return a.venSH.localeCompare( b.venSH );
		return 0;
	});
}

function sortByShipSH( items ) {
	return items.sort( ( a, b ) => {
		if ( a.shipSH !== b.shipSH ) return a.shipSH.localeCompare( b.shipSH );
		return 0;
	});
}

function sortByDateShipping( items ) {
	return items.sort( ( a, b ) => {
		a.shippingDate = new Date ( a.fshippingDate );
		b.shippingDate = new Date ( b.fshippingDate );
		if ( a.shippingDate > b.shippingDate ) return 1;
		if ( a.shippingDate < b.shippingDate ) return -1;
		return 0;
	});
}

function sortByArrivalDate( items ) {
	return items.sort( ( a, b ) => {
		a.arrivalDate = new Date ( a.farrivalDate );
		b.arrivalDate = new Date ( b.farrivalDate );
		if ( a.arrivalDate > b.arrivalDate ) return 1;
		if ( a.arrivalDate < b.arrivalDate ) return -1;
		return 0;
	});
}

const sort = {
	'product': sortByProduct,
	'totalQty': sortByTotalQty,
	'customer': sortByCustomer,
	'venSH': sortByVenSH,
	'shipSH': sortByShipSH,
	'description': sortByProduct,
	'fshippingDate': sortByDateShipping,
	'farrivalDate': sortByArrivalDate,
};

export default sort;
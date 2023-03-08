import { daysOfTheWeek } from '../../lib/data';

export function fullProduct( item ) {
	let product = item.product;
	if ( item.size ) product = product + ' ' + item.size;
	if ( item.variety ) product = product + ', ' + item.variety;
	return product;
}

export function boxes( item ) {
	return `${item.boxCount} ${item.boxType}`;
}

export function qtyUom( qty, uom ) {
	return `${qty} ${uom}`;
}

export function price( price ) {
	return `$${price.toFixed( 2 )}`;
}

export function arrayItems ( items ) {
	if ( !items || items.length === 0 ) return '';
	let str = '';
	items.forEach( ( item, i ) => {
		if ( items[i+1] ) {
			str += `${item}, `;
		}else {
			str += item;
		}
	});
	return str;
}

export function dayOfWeek ( dayNum ) {
	return daysOfTheWeek[dayNum];
}
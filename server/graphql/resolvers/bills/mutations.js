import moment from 'moment';
import Bill from '../../../models/bill.js';
import Sale from '../../../models/sale.js';

const billMutations = {

	addBill: async ( _, { newBill }) => {
		return new Bill( newBill ).save();
	},

	addBillItem: async ( _ , { newSale }) => {
		newSale.dateSold = moment.utc( new Date ( newSale.dateSold ) ).format( 'YYYY-MM-DD' );
		return new Sale( newSale ).save();
	},

	updateSaleQty: async ( _ , { id, newQuantity }) => {
		if ( newQuantity == 0 ) {
			return Sale.findByIdAndDelete(
				{ _id: id },
			);
		}
		return Sale.findOneAndUpdate(
			{ _id: id },
			{ 'item.quantity': newQuantity },
			{ $returnDocument: 'after' }
		);
	},
    
};

export default billMutations;
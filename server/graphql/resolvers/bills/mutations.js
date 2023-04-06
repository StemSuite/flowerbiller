import Bill from '../../../models/bill.js';

const billMutations = {

	addBill: async ( _, { newBill }) => {
		return new Bill( newBill ).save();
	}
    
};

export default billMutations;
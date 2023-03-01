import SoldItem from '../../../models/soldItem.js';
import Event from '../../../models/event.js';

const soldItemMutations = {
	addEventItem: async ( _, { eventID, item }) => {
		let newItem = new SoldItem( item );
		Event.findByIdAndUpdate( eventID, { $inc: { itemCount: 1 } }).exec();
		return newItem.save();
	}
};

export default soldItemMutations;
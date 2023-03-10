import Event from '../../../models/event.js';
import Sale from '../../../models/sale.js';
import moment from 'moment';

const eventMutations = {
	addEvent: async ( _, { event }) => {
		event.itemCount = 0;
		let newEvent = new Event( event );
		return newEvent.save();
	},

	addEventItem: async( _, { newSale }) => {
		newSale.dateSold = moment.utc( new Date ( newSale.dateSold ) ).format( 'YYYY-MM-DD' );
		newSale = new Sale( newSale );
		Event.findByIdAndUpdate( newSale.eventID, { $inc: { itemCount: 1 } }).exec();
		return newSale.save();
	}

	// deleteEventItem: async(_, {eventID, itemID}) => {
	//     return Event.findByIdAndUpdate(eventID, 
	//         {$pull: {items: {_id: itemID}}},
	//         {new: true}
	//     )},
};

export default eventMutations;
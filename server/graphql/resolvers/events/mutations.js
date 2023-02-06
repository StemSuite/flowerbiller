import Event from '../../../models/event.js';

const eventMutations = {
    addEvent: async (_, { event }) => {
        let newEvent = new Event( event )
        return newEvent.save()
    },

    addEventItem: async(_, {eventID, item}) => {
        return Event.findByIdAndUpdate(eventID,
            {$push: {items: item}}, 
            {new: true}
        )},

    deleteEventItem: async(_, {eventID, itemID}) => {
        return Event.findByIdAndUpdate(eventID, 
            {$pull: {items: {_id: itemID}}},
            {new: true}
        )},
}

export default eventMutations;
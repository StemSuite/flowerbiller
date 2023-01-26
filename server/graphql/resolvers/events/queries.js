import moment from 'moment'
import Event from '../../../models/event.js'


//changes moment instance to return 'N/A' instead of invalid on invalid dates
// helpful for when an end date is not supplied in a standing order
moment.updateLocale("es", {
    invalidDate: "N/A"
});

const EventQueries = {
    events: async () => {
        return Event.find().populate('store')
            .then( res => {
               return res.map(so => {
                    let formatted = so.toObject()
                    formatted.date = moment.utc(so.date, 'YYYY-MM-DD').format("MM/DD/YY")
                    return formatted
                })
            })
    },
    
    event: async (_, { id }) => {
        return Event.findById(id).populate('store').populate('items')
            .then( res => {
               let formatted = res.toObject()
               formatted.date = moment(res.startDate).format("MM/DD/YY")
               return formatted
            })
    },

}

export default EventQueries;
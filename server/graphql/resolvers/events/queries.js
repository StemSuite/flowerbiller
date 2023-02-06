import Event from '../../../models/event.js'

const EventQueries = {
    events: async () => {
        return Event.aggregate([
            { $project: {
                title: 1,
                customer: 1,
                store: 1,
                fdate: {$dateToString: {format: "%m/%d/%Y", date: "$date"}},
                itemCount: { "$sum": {"$size": "$items"} }
                }
            }
        ])
    },
    
    event: async (_, { id }) => {
        return Event.findById(id,
            {
                storeID: 1,
                title: 1,
                customer: 1,
                items: 1,
                store: 1,
                fdate: {$dateToString: {format: "%m/%d/%Y", date: "$date"}},
            })
    },

}

export default EventQueries;
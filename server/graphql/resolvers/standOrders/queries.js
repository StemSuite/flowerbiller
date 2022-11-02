import moment from 'moment'
import StandingOrder from '../../../models/standingOrder.js'

const standingOrderQueries = {
    standingOrders: async () => {
        return StandingOrder.find().populate('vendor')
            .then( res => {
               return res.map(so => {
                    let formatted = so.toObject()
                    formatted.startDate = moment(so.startDate).format("MM/DD/YY")
                    formatted.endDate = moment(so.endDate).format("MM/DD/YY")
                    return formatted
                })
            })
    },
    
    standingOrder: async (_, {id}) => {
        return StandingOrder.findById(id).populate('vendor')
            .then( res => {
               let formatted = res.toObject()
               formatted.startDate = moment(res.startDate).format("MM/DD/YY")
               formatted.endDate = moment(res.endDate).format("MM/DD/YY")
               return formatted
            })
    },

}

export default standingOrderQueries;
import moment from 'moment'
import StandingOrder from '../../../models/standing_order.js'


//changes moment instance to return 'N/A' instead of invalid on invalid dates
// helpful for when an end date is not supplied in a standing order
moment.updateLocale("es", {
    invalidDate: "N/A"
});

const standingOrderQueries = {
    standingOrders: async () => {
        return StandingOrder.find().populate('vendor')
            .then( res => {
               return res.map(so => {
                    let formatted = so.toObject()
                    formatted.startDate = moment.utc(so.startDate, 'YYYY-MM-DD').format("MM/DD/YY")
                    formatted.endDate = moment.utc(so.endDate, 'YYYY-MM-DD').format("MM/DD/YY")
                    return formatted
                })
            })
    },
    
    standingOrder: async (_, { id }) => {
        return StandingOrder.findById(id).populate('vendor').populate('shippingMethod')
            .populate({ path: 'items.variety', populate: {path: 'product'} })
            .then( res => {
               let formatted = res.toObject()
               formatted.startDate = moment(res.startDate).format("MM/DD/YY")
               formatted.endDate = moment(res.endDate).format("MM/DD/YY")
               formatted.items.forEach(item => {
                    item.prodName = item.variety.product.name
                    item.varName = item.variety.name
                    item.uom = item.variety.product.uom
                })
               return formatted
            })
    },

}

export default standingOrderQueries;
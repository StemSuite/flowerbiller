import StandingOrder from '../../../models/standingOrder.js';

const standingOrderMutations = {
    addStandingOrder: async (_, {standingOrder}) => {
        let newStandingOrder = new StandingOrder( standingOrder )
        return await newStandingOrder.save()
            .then(res => res.populate('vendor'))
    },

    addSOItem: async(_, {standingOrderId, item}) => {
        return StandingOrder.findByIdAndUpdate(standingOrderId, 
            {$push: {items: item}}, 
            {new: true}
        )},

    deleteSOItem: async(_, {standingOrderId, itemId}) => {
        return StandingOrder.findByIdAndUpdate(standingOrderId, 
            {$pull: {items: {_id: itemId}}},
            {new: true}
        )},
}

export default standingOrderMutations;
import StandingOrder from '../../../models/standing_order.js';

const standingOrderMutations = {
    addStandingOrder: async (_, {standingOrder}) => {
        let newStandingOrder = new StandingOrder( standingOrder )
        return newStandingOrder.save()
    },

    addSOItem: async(_, {standingOrderId, item}) => {
        item.totalQty = item.boxCount * item.qtyPerBox
        item.totalPrice = item.totalQty * item.pricePerUnit

        return StandingOrder.findByIdAndUpdate(standingOrderId, 
            {$push: {items: item}}, 
            {new: true}
        )
    },

    deleteSOItem: async(_, {standingOrderId, itemId}) => {
        return StandingOrder.findByIdAndUpdate(standingOrderId, 
            {$pull: {items: {_id: itemId}}},
            {new: true}
        )
    },
}

export default standingOrderMutations;
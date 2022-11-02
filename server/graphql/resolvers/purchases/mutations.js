import Purchase from '../../../models/purchase.js';
import StandingOrder from '../../../models/standingOrder.js';

const purchaseMutations = {
    addPurchase: async(_, {purchase}) => {
        let newPurchase = new Purchase( purchase )
        return newPurchase.save()
    },

    deletePurchase: async(_, {purchID, standingOrderID}) => {
        return Purchase.findByIdAndRemove(purchID).then((purch) => {
            StandingOrder.findByIdAndUpdate(standingOrderID, {$pull: {items: purchID}}).exec()
            return purch
        })
    },

}

export default purchaseMutations;
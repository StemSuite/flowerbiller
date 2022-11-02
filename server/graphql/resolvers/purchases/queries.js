import Purchase from '../../../models/purchase.js'

const purchaseQueries = {
    purchases: async () => {
        return Purchase.find()
    },
    
    purchase: async (_, args) => {
        return Purchase.findById(args.id)
    }
}

export default purchaseQueries;
